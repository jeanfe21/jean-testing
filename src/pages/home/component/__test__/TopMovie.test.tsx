import React from "react";
import { render, screen } from "@testing-library/react";
import TopMovie from "../TopMovie";
import { checkNew } from "../../../../@core/utils/checkNew";
import type { GetMovieResponse } from "../../../../interface/movie/GetListMovieResponse";

// Mock the checkNew function
jest.mock("../../../../@core/utils/checkNew", () => ({
  checkNew: jest.fn(),
}));

const mockMovieData: GetMovieResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/example.jpg",
      genre_ids: [1, 2],
      id: 123,
      original_language: "en",
      original_title: "Example Movie",
      overview: "This is an example movie.",
      popularity: 100,
      poster_path: "/example_poster.jpg",
      release_date: "2025-01-01",
      title: "Example Movie",
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
    {
      adult: false,
      backdrop_path: "/example2.jpg",
      genre_ids: [3, 4],
      id: 456,
      original_language: "en",
      original_title: "Another Movie",
      overview: "This is another movie.",
      popularity: 50,
      poster_path: "/another_poster.jpg",
      release_date: "2025-02-01",
      title: "Another Movie",
      video: false,
      vote_average: 6.0,
      vote_count: 500,
    },
  ],
  total_pages: 1,
  total_results: 2,
};

describe("TopMovie Component", () => {
  it("renders the component with movie data", () => {
    (checkNew as jest.Mock).mockReturnValue(true);

    render(<TopMovie movieData={mockMovieData} />);

    expect(screen.getByText("Top Movie 2025")).toBeInTheDocument();
    expect(screen.getByText("Explore More")).toBeInTheDocument();

    // Check if ContentCard components are rendered
    expect(screen.getAllByText("Example Movie").length).toBe(1);
    expect(screen.getAllByText("Another Movie").length).toBe(1);

    // Check if checkNew is called with the correct dates
    expect(checkNew).toHaveBeenCalledWith({ date: "2025-01-01" });
    expect(checkNew).toHaveBeenCalledWith({ date: "2025-02-01" });
  });

  it("renders the correct number of ContentCard components", () => {
    (checkNew as jest.Mock).mockReturnValue(false);
    render(<TopMovie movieData={mockMovieData} />);
    expect(screen.getAllByRole("img").length).toBe(2);
  });

  it("does not render ContentCard components when there are no results", () => {
    render(<TopMovie movieData={{ ...mockMovieData, results: [] }} />);
    expect(screen.queryByText("Example Movie")).not.toBeInTheDocument();
    expect(screen.queryByText("Another Movie")).not.toBeInTheDocument();
  });
});
