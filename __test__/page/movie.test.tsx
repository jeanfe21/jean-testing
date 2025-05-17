/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviePage from "../../src/pages/movie/index"; // Adjust path to your MoviePage component
import type {
  GetMovieResponse,
  result,
} from "../../src/interface/movie/GetListMovieResponse"; // Adjust path

// --- Mocks ---

// Mock GetData hook
const mockGetData = jest.fn();
jest.mock("../../@core/hook/FetchingData", () => ({
  __esModule: true,
  default: mockGetData,
}));

// Mock MovieCard component
jest.mock("../../components/movie/MovieCard", () => ({
  __esModule: true,
  // Render a simple div with key props for easy assertion
  default: jest.fn(({ id, title, year, rating }) => (
    <div data-testid={`movie-card-${id}`}>
      <h3>{title}</h3>
      <span>Year: {year}</span>
      <span>Rating: {rating}</span>
    </div>
  )),
}));

// Mock Loading component
jest.mock("../../components/root/Loading", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="loading-component">Loading...</div>),
}));

// Mock Container component (optional, could let it render if simple)
jest.mock("../../components/root/Container", () => ({
  __esModule: true,
  default: jest.fn(({ children, className }) => (
    <div className={className}>{children}</div>
  )),
}));

// Mock findMovie utility
const mockFindMovie = jest.fn();
jest.mock("../../@core/utils/findMovie", () => ({
  findMovie: mockFindMovie,
}));

// Helper to create mock movie results
const createMockMovieResults = (count: number, prefix: string): result[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${prefix} Movie ${i + 1}`,
    overview: `Overview for ${prefix} movie ${i + 1}`,
    poster_path: `/poster${i + 1}.jpg`,
    release_date: `202${i}`,
    vote_average: 7 + i * 0.1,
    genre_ids: [28, 12], // Example genre IDs
    adult: false,
    backdrop_path: `/backdrop${i + 1}.jpg`,
    original_language: "en",
    original_title: `${prefix} Original Movie ${i + 1}`,
    popularity: 100 + i,
    video: false,
    vote_count: 1000 + i * 10,
  }));
};

const defaultMockData: GetMovieResponse = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

describe("MoviePage Component", () => {
  const baseProps = {
    year: "",
    genre: "",
    search: "",
  };

  beforeEach(() => {
    // Reset all mocks before each test
    mockGetData.mockReset();
    mockFindMovie.mockReset();
    (
      require("../../src/components/movie/MovieCard").default as jest.Mock
    ).mockClear();
    (
      require("../../src/components/root/Loading").default as jest.Mock
    ).mockClear();
  });

  // Helper to set up mockGetData return values
  const setupGetDataMocks = ({
    listMovieLoading = false,
    listMovieFetching = false,
    listMovieData = {
      ...defaultMockData,
      results: createMockMovieResults(3, "List"),
    },
    nowPlayingLoading = false, // Note: MoviePage uses isFetching for nowPlaying, named fetchNowPlaying
    nowPlayingFetching = false,
    nowPlayingData = {
      ...defaultMockData,
      results: createMockMovieResults(2, "NowPlaying"),
    },
    searchMovieLoading = false, // Note: MoviePage uses isFetching for searchMovie, named fetchSearch
    searchMovieFetching = false,
    searchMovieData = {
      ...defaultMockData,
      results: createMockMovieResults(1, "Search"),
    },
  }: {
    listMovieLoading?: boolean;
    listMovieFetching?: boolean;
    listMovieData?: GetMovieResponse | undefined; // Allow undefined for initial loading state
    nowPlayingLoading?: boolean;
    nowPlayingFetching?: boolean;
    nowPlayingData?: GetMovieResponse;
    searchMovieLoading?: boolean;
    searchMovieFetching?: boolean;
    searchMovieData?: GetMovieResponse;
  }) => {
    mockGetData.mockImplementation(
      (url: string, queryKey: Array<string | number | undefined | unknown>) => {
        const keyType = queryKey[0];
        if (keyType === "getListMovie") {
          return {
            data: listMovieData,
            isLoading: listMovieLoading,
            isFetching: listMovieFetching,
            isError: false,
            error: null,
          };
        }
        // Differentiate "nowplaying" key by URL since it's used for two different fetches
        if (keyType === "nowplaying") {
          if (url.startsWith("/movie/")) {
            // This is the "nowPlaying" specific fetch
            return {
              data: nowPlayingData,
              isLoading: nowPlayingLoading, // Corresponds to isLoading in useQuery
              isFetching: nowPlayingFetching, // Corresponds to isFetching in useQuery (fetchNowPlaying in component)
              isError: false,
              error: null,
            };
          }
          if (url.startsWith("/search/movie")) {
            // This is the "searchMovie" fetch
            return {
              data: searchMovieData,
              isLoading: searchMovieLoading,
              isFetching: searchMovieFetching, // Corresponds to isFetching in useQuery (fetchSearch in component)
              isError: false,
              error: null,
            };
          }
        }
        return {
          data: defaultMockData,
          isLoading: false,
          isFetching: false,
          isError: false,
          error: null,
        };
      }
    );
  };

  test("renders Loading component when listMovie data is initially undefined", () => {
    setupGetDataMocks({ listMovieData: undefined, listMovieLoading: true });
    render(<MoviePage {...baseProps} />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders Loading component when listMovie isLoading is true", () => {
    setupGetDataMocks({ listMovieLoading: true });
    render(<MoviePage {...baseProps} />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders Loading component when listMovie isFetching is true", () => {
    setupGetDataMocks({ listMovieFetching: true });
    render(<MoviePage {...baseProps} />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders Loading component when fetchNowPlaying (nowPlaying isFetching) is true", () => {
    setupGetDataMocks({ nowPlayingFetching: true });
    render(<MoviePage {...baseProps} search="now_playing" />); // search needs to be valid for this fetch
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders Loading component when fetchSearch (searchMovie isFetching) is true", () => {
    setupGetDataMocks({ searchMovieFetching: true });
    mockFindMovie.mockReturnValue(false); // To enable searchMovie fetch
    render(<MoviePage {...baseProps} search="some query" />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders movies from listMovie when other data sources are not applicable or empty", async () => {
    const listMovies = createMockMovieResults(3, "List");
    setupGetDataMocks({
      listMovieData: { ...defaultMockData, results: listMovies },
      searchMovieData: { ...defaultMockData, results: [] }, // Search returns no results
      nowPlayingData: { ...defaultMockData, results: [] }, // NowPlaying returns no results
    });
    mockFindMovie.mockReturnValue(false); // So searchMovie is attempted but returns empty

    render(<MoviePage {...baseProps} search="some_query_for_empty_search" />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
      expect(
        screen.getByTestId(`movie-card-${listMovies[0].id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(listMovies[0].title)).toBeInTheDocument();
      expect(screen.getAllByTestId(/movie-card-/)).toHaveLength(3);
    });
  });

  test('renders movies from nowPlaying when search matches findMovie and not "all"', async () => {
    const nowPlayingMovies = createMockMovieResults(2, "NowPlaying");
    setupGetDataMocks({
      nowPlayingData: { ...defaultMockData, results: nowPlayingMovies },
      searchMovieData: { ...defaultMockData, results: [] }, // Search returns no results
    });
    mockFindMovie.mockReturnValue(true); // findMovie returns true for the search term

    render(<MoviePage {...baseProps} search="top_rated" />); // search is not "all"

    await waitFor(() => {
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
      expect(
        screen.getByTestId(`movie-card-${nowPlayingMovies[0].id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(nowPlayingMovies[0].title)).toBeInTheDocument();
      expect(screen.getAllByTestId(/movie-card-/)).toHaveLength(2);
    });
    // Check that GetData for nowPlaying was enabled
    // The third call to mockGetData is for searchMovie, its 'enabled' is findMovie(search) ? false : true
    // The second call to mockGetData is for nowPlaying, its 'enabled' is findMovie(search) && search !== "all" ? true : false
    expect(mockGetData.mock.calls[1][5]).toBe(true); // Check 'enabled' for nowPlaying fetch
  });

  test("renders movies from searchMovie when it has results (highest priority)", async () => {
    const searchResults = createMockMovieResults(1, "Search");
    setupGetDataMocks({
      searchMovieData: { ...defaultMockData, results: searchResults },
      nowPlayingData: {
        ...defaultMockData,
        results: createMockMovieResults(5, "NowPlaying"),
      }, // Should be ignored
      listMovieData: {
        ...defaultMockData,
        results: createMockMovieResults(5, "List"),
      }, // Should be ignored
    });
    mockFindMovie.mockReturnValue(false); // So searchMovie fetch is enabled

    render(<MoviePage {...baseProps} search="My Movie Query" />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
      expect(
        screen.getByTestId(`movie-card-${searchResults[0].id}`)
      ).toBeInTheDocument();
      expect(screen.getByText(searchResults[0].title)).toBeInTheDocument();
      expect(screen.getAllByTestId(/movie-card-/)).toHaveLength(1);
    });
    // Check that GetData for searchMovie was enabled
    expect(mockGetData.mock.calls[2][5]).toBe(true); // Check 'enabled' for searchMovie fetch
  });

  test("passes correct parameters to GetData for listMovie", () => {
    setupGetDataMocks({}); // Default setup
    render(<MoviePage {...baseProps} genre="28" year="2022" />);
    expect(mockGetData).toHaveBeenCalledWith(
      expect.stringContaining("/discover/movie"),
      ["getListMovie", "28", "2022"], // queryKey
      { page: 1, with_genres: "28", primary_release_year: "2022" }, // params
      { results: [] }, // initialData
      undefined, // enabled (defaults to true)
      undefined // otherQueryOptions
    );
  });

  test("nowPlaying fetch is disabled if findMovie returns false", () => {
    setupGetDataMocks({});
    mockFindMovie.mockReturnValue(false);
    render(<MoviePage {...baseProps} search="some_search_term" />);
    // The second call to mockGetData is for the /movie/${search} endpoint
    const nowPlayingCallArgs = mockGetData.mock.calls.find((call) =>
      call[0].startsWith("/movie/")
    );
    expect(nowPlayingCallArgs?.[5]).toBe(false); // `enabled` argument
  });

  test('nowPlaying fetch is disabled if search is "all"', () => {
    setupGetDataMocks({});
    mockFindMovie.mockReturnValue(true); // findMovie is true
    render(<MoviePage {...baseProps} search="all" />);
    const nowPlayingCallArgs = mockGetData.mock.calls.find((call) =>
      call[0].startsWith("/movie/")
    );
    expect(nowPlayingCallArgs?.[5]).toBe(false); // `enabled` argument
  });

  test("searchMovie fetch is enabled if findMovie returns false", () => {
    setupGetDataMocks({});
    mockFindMovie.mockReturnValue(false);
    render(<MoviePage {...baseProps} search="custom_search" />);
    // The third call to mockGetData is for the /search/movie endpoint
    const searchMovieCallArgs = mockGetData.mock.calls.find((call) =>
      call[0].startsWith("/search/movie")
    );
    expect(searchMovieCallArgs?.[5]).toBe(true); // `enabled` argument
  });

  test("searchMovie fetch is disabled if findMovie returns true", () => {
    setupGetDataMocks({});
    mockFindMovie.mockReturnValue(true);
    render(<MoviePage {...baseProps} search="top_rated" />); // e.g., a search term findMovie recognizes
    const searchMovieCallArgs = mockGetData.mock.calls.find((call) =>
      call[0].startsWith("/search/movie")
    );
    expect(searchMovieCallArgs?.[5]).toBe(false); // `enabled` argument
  });

  test("renders no MovieCards if all data sources are empty and not loading", async () => {
    setupGetDataMocks({
      listMovieData: { ...defaultMockData, results: [] },
      nowPlayingData: { ...defaultMockData, results: [] },
      searchMovieData: { ...defaultMockData, results: [] },
    });
    mockFindMovie.mockReturnValue(false); // Example, doesn't really matter if all results are empty

    render(<MoviePage {...baseProps} search="empty_search_term" />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
    });
    expect(screen.queryAllByTestId(/movie-card-/)).toHaveLength(0);
  });
});
