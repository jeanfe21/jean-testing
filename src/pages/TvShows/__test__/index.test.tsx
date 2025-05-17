import { render, screen, waitFor } from "@testing-library/react";
import TvShowsPage from "../index";
import GetData from "../../../@core/hook/FetchingData";

// Mock the GetData hook
jest.mock("../../../@core/hook/FetchingData");

describe("TvShowsPage Component", () => {
  const mockTvShowsData = {
    results: [
      {
        id: 1,
        name: "TV Show 1",
        overview: "Overview 1",
        poster_path: "/poster1.jpg",
        first_air_date: "2023-01-01",
        vote_average: 7.5,
      },
      {
        id: 2,
        name: "TV Show 2",
        overview: "Overview 2",
        poster_path: "/poster2.jpg",
        first_air_date: "2023-01-02",
        vote_average: 8.0,
      },
    ],
  };

  beforeEach(() => {
    (GetData as jest.Mock).mockClear();
  });

  it("should render TvShowsPage component with TV show data", async () => {
    (GetData as jest.Mock).mockReturnValue({
      data: mockTvShowsData,
      isLoading: false,
    });

    render(<TvShowsPage />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("TV Show 1")).toBeInTheDocument();
    });

    // Check if the component renders with the correct data
    expect(screen.getByText("Overview 1")).toBeInTheDocument();
  });

  it("should render Loading component when data is loading or empty", () => {
    (GetData as jest.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: true,
    });

    render(<TvShowsPage />);

    // Check if the Loading component is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
