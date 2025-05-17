import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../index";
import GetData from "../../../@core/hook/FetchingData";

// Mock the GetData hook
jest.mock("../../../@core/hook/FetchingData");

describe("HomePage Component", () => {
  const mockMovieData = {
    results: [
      {
        id: 1,
        title: "Movie 1",
        overview: "Overview 1",
        poster_path: "/poster1.jpg",
        release_date: "2023-01-01",
        vote_average: 7.5,
      },
      {
        id: 2,
        title: "Movie 2",
        overview: "Overview 2",
        poster_path: "/poster2.jpg",
        release_date: "2023-01-02",
        vote_average: 8.0,
      },
    ],
  };

  beforeEach(() => {
    (GetData as jest.Mock).mockClear();
  });

  it("should render HomePage component with movie data", async () => {
    (GetData as jest.Mock).mockReturnValue({
      data: mockMovieData,
      isLoading: false,
    });

    render(<HomePage />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });

    // Check if the component renders with the correct data
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Overview 2")).toBeInTheDocument();
  });

  it("should render Loading component when data is loading or empty", () => {
    (GetData as jest.Mock).mockReturnValue({
      data: { results: [] },
      isLoading: true,
    });

    render(<HomePage />);

    // Check if the Loading component is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
