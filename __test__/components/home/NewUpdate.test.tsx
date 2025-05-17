import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewUpdate from "../../../src/pages/home/component/NewUpdate";
import GetData from "../../../src/@core/hook/FetchingData";

// Mock the GetData hook
jest.mock("../../../src/@core/hook/FetchingData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("NewUpdate Component", () => {
  beforeEach(() => {
    (GetData as jest.Mock).mockClear();
  });

  it("renders without crashing", () => {
    (GetData as jest.Mock).mockReturnValue({ data: { results: [] } });
    render(<NewUpdate />);
  });

  it("displays the 'Now Playing' title", () => {
    (GetData as jest.Mock).mockReturnValue({ data: { results: [] } });
    render(<NewUpdate />);
    expect(screen.getByText("Now Playing")).toBeInTheDocument();
  });

  it("displays content cards when data is available", async () => {
    (GetData as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            title: "Test Movie",
            poster_path: "/test.jpg",
            vote_average: 7.5,
            release_date: "2024-01-01",
            genre_ids: [28],
          },
        ],
      },
    });
    render(<NewUpdate />);
    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });
  });

  it("displays 'no data' when there is no data", () => {
    (GetData as jest.Mock).mockReturnValue({ data: null });
    render(<NewUpdate />);
    expect(screen.getByText("no data")).toBeInTheDocument();
  });
});
