import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContentCard } from "../../../src/pages/home/component/ContentCard"; // Adjust path to your ContentCard component
import { findGenre } from "../../../src/@core/utils/findGenre";

// --- Mocks ---

// Mock @tanstack/react-router
const mockNavigateFunction = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"), // Keep other exports
  useNavigate: () => mockNavigateFunction,
}));

// Mock @/components/ui/badge if it's complex.
// For now, assuming it renders children and classNames correctly.
// jest.mock('@/components/ui/badge', () => ({
//   Badge: ({ children, className }: { children: React.ReactNode, className?: string }) => (
//     <span className={`mock-badge ${className || ''}`}>{children}</span>
//   ),
// }));

const mockBaseProps = {
  id: "c123",
  title: "Epic Adventure Quest",
  image: "https://example.com/epic-adventure.jpg",
  year: "2025",
  category: "movie-action", // This will be passed to findGenre
};

describe("ContentCard Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockNavigateFunction.mockClear();
    // (
    //   require("../../../@core/utils/findGenre").findGenre as jest.Mock
    // ).mockClear();
    jest.spyOn(console, "log").mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log and any other spies
  });

  test("renders basic content details correctly", () => {
    render(<ContentCard {...mockBaseProps} />);

    // Check title (which is also the clickable element)
    expect(screen.getByText(mockBaseProps.title)).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText(mockBaseProps.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockBaseProps.image);

    // Check year
    expect(screen.getByText(mockBaseProps.year)).toBeInTheDocument();

    // Check category (via findGenre mock)
    expect(findGenre).toHaveBeenCalledWith(mockBaseProps.category);
    expect(screen.getByText("Action Movie")).toBeInTheDocument(); // Mocked return value for 'movie-action'

    // Ensure optional elements are not present by default
    expect(screen.queryByText(/Episode/i)).not.toBeInTheDocument();
    expect(screen.queryByText("NEW")).not.toBeInTheDocument();
    // The star SVG for rating is also not present by default
    expect(
      (
        screen.queryByRole("img", { hidden: true }) as HTMLElement
      )?.querySelector('path[fill-rule="evenodd"]')
    ).not.toBeInTheDocument();
  });

  test("renders placeholder image if image prop is empty or null", () => {
    render(<ContentCard {...mockBaseProps} image="" />);
    const image = screen.getByAltText(mockBaseProps.title);
    expect(image).toHaveAttribute("src", "/placeholder.svg");

    render(<ContentCard {...mockBaseProps} image={"/placeholder.svg"} />); // Test with null
    const imageNull = screen.getByAltText(mockBaseProps.title);
    expect(imageNull).toHaveAttribute("src", "/placeholder.svg");
  });

  test("renders rating when provided", () => {
    const ratingValue = 8.7;
    render(<ContentCard {...mockBaseProps} rating={ratingValue} />);

    expect(screen.getByText(ratingValue.toString())).toBeInTheDocument();
    // Check for the inline SVG star icon
    const starSvg = screen.getByText(ratingValue.toString()).previousSibling;
    expect(starSvg).toBeInTheDocument();
    expect(starSvg?.nodeName.toLowerCase()).toBe("svg");
    expect(
      (starSvg as HTMLElement)?.querySelector('path[fill-rule="evenodd"]')
    ).toBeInTheDocument();
  });

  test("renders episode number and title when provided", () => {
    const episodeNumber = 5;
    const episodeTitle = "The Great Discovery";
    render(
      <ContentCard
        {...mockBaseProps}
        episodeNumber={episodeNumber}
        episodeTitle={episodeTitle}
      />
    );

    expect(
      screen.getByText(`Episode ${episodeNumber}: ${episodeTitle}`)
    ).toBeInTheDocument();
  });

  test("renders only episode number when episode title is not provided", () => {
    const episodeNumber = 3;
    render(<ContentCard {...mockBaseProps} episodeNumber={episodeNumber} />);
    expect(screen.getByText(`Episode ${episodeNumber}`)).toBeInTheDocument();
    expect(screen.getByText(`Episode ${episodeNumber}`)).not.toHaveTextContent(
      ":"
    );
  });

  test('renders "NEW" badge when isNew is true', () => {
    render(<ContentCard {...mockBaseProps} isNew={true} />);
    const newBadge = screen.getByText("NEW");
    expect(newBadge).toBeInTheDocument();
    // You could also check for specific classes if your Badge mock doesn't simplify too much
    // expect(newBadge).toHaveClass('bg-purple-600');
  });

  test("clicking the title calls handleClick and then navigate with correct parameters", () => {
    render(<ContentCard {...mockBaseProps} />);

    const clickableTitle = screen.getByText(mockBaseProps.title);
    fireEvent.click(clickableTitle);

    // Check console.log was called (as per component's handleClick)
    expect(console.log).toHaveBeenCalledWith(mockBaseProps.id);

    // Check navigation
    expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
    expect(mockNavigateFunction).toHaveBeenCalledWith({
      to: "/movie/$movieId", // As per component's handleClick
      params: {
        movieId: mockBaseProps.id,
      },
    });
  });

  test("uses findGenre for category display", () => {
    const category = "tv-comedy";

    render(<ContentCard {...mockBaseProps} category={category} />);

    expect(findGenre).toHaveBeenCalledWith(category);
    expect(screen.getByText("Comedy Series")).toBeInTheDocument(); // Mocked return for 'tv-comedy'
  });
});
