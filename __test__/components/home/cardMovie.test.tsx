import React from "react";
import { findGenre } from "../../../src/@core/utils/findGenre";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "../../../src/components/movie/MovieCard"; // Adjust path to your MovieCard component

// --- Mocks ---

// Mock @tanstack/react-router
const mockNavigateFunction = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"), // Keep other exports
  useNavigate: () => mockNavigateFunction,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="lucide-star-icon" {...props} />
  ),
  Heart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="lucide-heart-icon" {...props} />
  ),
  Clock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="lucide-clock-icon" {...props} />
  ),
}));

// Mock the findGenre utility
// Assuming findGenre returns the genre name as a string
jest.mock("../../@core/utils/findGenre", () => ({
  findGenre: jest.fn((genreId: number) => {
    // Return a mock genre name based on ID for consistent testing
    const genreMap: { [key: number]: string } = {
      28: "Action",
      35: "Comedy",
      18: "Drama",
    };
    return genreMap[genreId] || `Genre ${genreId}`;
  }),
}));

// Mock shadcn/ui components if they cause issues or to simplify.
// For this example, we assume Card, CardContent, CardFooter, Badge, Button
// render standard HTML elements that @testing-library/react can interact with.
// If they have complex internal logic or contexts, more specific mocks may be needed.
// e.g., jest.mock('@/components/ui/button', () => ({ Button: ({children, onClick, ...props}) => <button onClick={onClick} {...props}>{children}</button> }));
// For now, no deep mocks for these.

const mockMovieProps = {
  id: "123",
  title: "Awesome Movie Title",
  year: "2024",
  rating: 8.5,
  duration: "2h 15m",
  genres: [28, 35], // Action, Comedy
  description:
    "A thrilling adventure of code and courage. This is a great movie that everyone should watch at least once in their lifetime.",
  imageUrl: "https://example.com/awesome-movie.jpg",
};

describe("MovieCard Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockNavigateFunction.mockClear();
    (findGenre as jest.Mock).mockClear();
  });

  test("renders all movie details correctly", () => {
    render(<MovieCard {...mockMovieProps} />);

    // Check title
    expect(screen.getByText(mockMovieProps.title)).toBeInTheDocument();

    // Check year
    expect(screen.getByText(mockMovieProps.year)).toBeInTheDocument();

    // Check rating (formatted to one decimal place)
    expect(
      screen.getByText(mockMovieProps.rating.toFixed(1))
    ).toBeInTheDocument();
    expect(screen.getByTestId("lucide-star-icon")).toBeInTheDocument();

    // Check duration
    expect(screen.getByText(mockMovieProps.duration)).toBeInTheDocument();
    expect(screen.getByTestId("lucide-clock-icon")).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText(`${mockMovieProps.title} poster`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockMovieProps.imageUrl);

    // Check description (line-clamp makes full text hard to assert, check presence)
    expect(screen.getByText(mockMovieProps.description)).toBeInTheDocument();

    // Check genres
    // findGenre should be called for each genre ID
    expect(findGenre).toHaveBeenCalledWith(28);
    expect(findGenre).toHaveBeenCalledWith(35);
    // Check that the mocked genre names are rendered
    expect(screen.getByText("Action")).toBeInTheDocument(); // Mocked return value
    expect(screen.getByText("Comedy")).toBeInTheDocument(); // Mocked return value
  });

  test("renders placeholder image if imageUrl is null or empty", () => {
    render(<MovieCard {...mockMovieProps} imageUrl="" />);
    const image = screen.getByAltText(`${mockMovieProps.title} poster`);
    expect(image).toHaveAttribute("src", "/placeholder.svg");
  });

  test("renders favorite button", () => {
    render(<MovieCard {...mockMovieProps} />);
    expect(
      screen.getByRole("button", { name: "Add to favorites" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("lucide-heart-icon")).toBeInTheDocument();
    // Note: The favorite button in the component doesn't have an onClick handler,
    // so we only test its presence.
  });

  test("detail movie button calls navigate with correct parameters on click", () => {
    render(<MovieCard {...mockMovieProps} />);

    const detailButton = screen.getByRole("button", { name: "Detail Movie" });
    expect(detailButton).toBeInTheDocument();

    fireEvent.click(detailButton);

    expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
    expect(mockNavigateFunction).toHaveBeenCalledWith({
      to: "/movie/$movieId",
      params: {
        movieId: mockMovieProps.id,
      },
    });
  });

  test("genres are displayed correctly using findGenre utility", () => {
    const genres = [18, 28]; // Drama, Action

    render(<MovieCard {...mockMovieProps} genres={genres} />);

    expect(findGenre).toHaveBeenCalledWith(18);
    expect(findGenre).toHaveBeenCalledWith(28);
    expect(screen.getByText("Drama")).toBeInTheDocument(); // From mock
    expect(screen.getByText("Action")).toBeInTheDocument(); // From mock
  });
});
