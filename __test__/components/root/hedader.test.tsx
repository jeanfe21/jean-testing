/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { SiteHeader } from "../../../src/components/root/Header"; // Adjust path if SiteHeader.tsx is elsewhere

// --- Mocks ---

// Mock @tanstack/react-router
const mockNavigateFunction = jest.fn();
jest.mock("@tanstack/react-router", () => ({
  // Keep other exports from the original module if any are used directly and not mocked
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: () => mockNavigateFunction, // Mock the navigate function returned by the hook
  Link: jest.fn(({ to, search, children, className, ...rest }: any) => (
    // Mock Link as a simple anchor tag. We can assert its props.
    <a
      href={to as string}
      data-search-params={search ? JSON.stringify(search) : undefined}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )),
}));

// Mock data imports from ./data/header
jest.mock("./data/header", () => ({
  movieItem: [
    { id: "popular_movies", name: "Popular Movies" },
    { id: "now_playing_movies", name: "Now Playing Movies" },
  ],
  genreData: [
    { id: "28", name: "Action Genre" }, // Made names more specific for easier querying
    { id: "35", name: "Comedy Genre" },
  ],
  year: ["2024", "2023"],
  tvshowItem: [
    { id: "popular_tv", name: "Popular TV Shows" },
    { id: "on_the_air_tv", name: "On The Air TV" },
  ],
}));

// Mock lucide-react icons to simplify tests and avoid complex SVG assertions.
// This makes tests cleaner and focus on functionality rather than icon rendering details.
jest.mock("lucide-react", () => ({
  Search: (props: any) => <svg data-testid="lucide-search-icon" {...props} />,
  Menu: (props: any) => <svg data-testid="lucide-menu-icon" {...props} />,
  X: (props: any) => <svg data-testid="lucide-x-icon" {...props} />,
  Film: (props: any) => <svg data-testid="lucide-film-icon" {...props} />,
  ChevronDown: (props: any) => (
    <svg data-testid="lucide-chevron-down-icon" {...props} />
  ),
}));

// Mock shadcn/ui components if they cause issues or to simplify.
// For this example, we assume they render standard HTML elements that
// @testing-library/react can interact with. If DropdownMenu, Button, Input
// have very complex internal logic or rely on contexts not easily provided,
// more specific mocks might be needed.
// e.g., jest.mock('@/components/ui/button', () => ({ Button: ({children, onClick, ...props}) => <button onClick={onClick} {...props}>{children}</button> }));
// For now, no deep mocks for shadcn components.

// Mock @/lib/utils if `cn` function is complex or has external dependencies.
// Usually, it's a simple classname joiner.
// jest.mock('@/lib/utils', () => ({ cn: (...args: any[]) => args.filter(Boolean).join(' ') }));

describe("SiteHeader Component", () => {
  beforeEach(() => {
    // Reset mocks and global states before each test
    mockNavigateFunction.mockClear();
    window.scrollY = 0;
    // It's good practice to clean up the document body if render creates portals outside the main container
    // document.body.innerHTML = '';
    // However, @testing-library/react's render usually handles cleanup well.
  });

  test("renders initial elements: logo, desktop navigation, search, and login", () => {
    render(<SiteHeader />);

    // Logo
    expect(screen.getByText("TheMovie")).toBeInTheDocument();
    expect(screen.getByTestId("lucide-film-icon")).toBeInTheDocument();

    // Desktop Navigation Dropdown Triggers
    expect(screen.getByRole("button", { name: /Movies/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Genre/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Year/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /TV Shows/i })
    ).toBeInTheDocument();

    // Desktop Navigation Link
    expect(
      screen.getByRole("link", { name: /Popular People/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Popular People/i })
    ).toHaveAttribute("href", "/people");

    // Desktop Search Icon/Button
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument(); // Accessible name from sr-only span

    // Login Button (there are two, one for desktop, one for mobile menu - check the visible one)
    // Let's find the one that is not inside the initially hidden mobile menu.
    const loginButtons = screen.getAllByRole("button", { name: "Login" });
    const desktopLoginButton = loginButtons.find(
      (btn) => btn.closest(".md\\:flex") || !btn.closest(".md\\:hidden")
    );
    expect(desktopLoginButton).toBeVisible();

    // Mobile Menu Toggle Button (initially shows Menu icon)
    expect(
      screen.getByRole("button", { name: "Toggle menu" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("lucide-menu-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("lucide-x-icon")).not.toBeInTheDocument();
  });

  test("header style changes on window scroll", async () => {
    const { container } = render(<SiteHeader />);
    // The header element is the first child of the container created by render
    const headerElement = container.firstChild as HTMLElement;

    // Initial style (not scrolled, transparent gradient)
    expect(headerElement).toHaveClass("bg-gradient-to-b");
    expect(headerElement).not.toHaveClass("bg-black/90");

    // Simulate scroll down (past 10px threshold)
    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      expect(headerElement).toHaveClass("bg-black/90");
      expect(headerElement).not.toHaveClass("bg-gradient-to-b");
    });

    // Simulate scroll up (back to top)
    act(() => {
      window.scrollY = 0;
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      expect(headerElement).toHaveClass("bg-gradient-to-b");
      expect(headerElement).not.toHaveClass("bg-black/90");
    });
  });

  describe("Desktop Search", () => {
    test("input opens and closes on search icon click", () => {
      render(<SiteHeader />);
      const searchToggleButton = screen.getByRole("button", { name: "Search" });
      const searchInput = screen.getByPlaceholderText(
        "Search movies, shows..."
      ); // This is the desktop search input

      // Initially, search input should be closed (opacity-0, width-0 based on classes)
      expect(searchInput).toHaveClass("opacity-0");

      // Open search
      fireEvent.click(searchToggleButton);
      expect(searchInput).toHaveClass("opacity-100");
      expect(searchInput).toHaveStyle("width: 100%"); // Or check for 'w-full' if style is not directly applied

      // Close search
      fireEvent.click(searchToggleButton);
      expect(searchInput).toHaveClass("opacity-0");
    });

    test("typing in input calls navigate function with correct parameters", () => {
      render(<SiteHeader />);
      const searchToggleButton = screen.getByRole("button", { name: "Search" });
      fireEvent.click(searchToggleButton); // Open search

      const searchInput = screen.getByPlaceholderText(
        "Search movies, shows..."
      );
      fireEvent.change(searchInput, { target: { value: "Inception" } });

      expect(mockNavigateFunction).toHaveBeenCalledTimes(1);
      expect(mockNavigateFunction).toHaveBeenCalledWith(
        expect.objectContaining({
          replace: true,
          // The search property is a function, so we test its behavior
        })
      );

      // Test the updater function passed to navigate's search property
      const navigateCallArg = mockNavigateFunction.mock.calls[0][0];
      const oldSearchParams = { genre: "action", existing: "param" };
      const newSearchParams = navigateCallArg.search(oldSearchParams);
      expect(newSearchParams).toEqual({
        genre: "action",
        existing: "param",
        search: "Inception",
      });

      // Test clearing the search
      fireEvent.change(searchInput, { target: { value: "" } });
      expect(mockNavigateFunction).toHaveBeenCalledTimes(2);
      const navigateCallArg2 = mockNavigateFunction.mock.calls[1][0];
      const newSearchParamsCleared = navigateCallArg2.search(oldSearchParams);
      expect(newSearchParamsCleared).toEqual({
        genre: "action",
        existing: "param",
        search: "",
      });
    });
  });

  describe("Mobile Menu", () => {
    test("toggles visibility and icon on menu button click", async () => {
      render(<SiteHeader />);
      const mobileMenuButton = screen.getByRole("button", {
        name: "Toggle menu",
      });

      // Find the mobile menu container by a class that indicates it's the mobile menu
      // This is brittle; a data-testid on the mobile menu container would be better.
      // We'll check visibility of elements within it.
      // The mobile menu has a specific search input.
      const allSearchInputs = screen.getAllByPlaceholderText(
        "Search movies, shows..."
      );
      const mobileSearchInput = allSearchInputs.find((input) =>
        input.closest(".md\\:hidden")
      );

      expect(mobileSearchInput).not.toBeVisible(); // Initially closed
      expect(screen.getByTestId("lucide-menu-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("lucide-x-icon")).not.toBeInTheDocument();

      // Open mobile menu
      fireEvent.click(mobileMenuButton);
      await waitFor(() =>
        expect(screen.getByTestId("lucide-x-icon")).toBeInTheDocument()
      );

      expect(mobileSearchInput).toBeVisible();
      expect(screen.queryByTestId("lucide-menu-icon")).not.toBeInTheDocument();
      // Check for a link unique to mobile menu
      expect(
        within(
          mobileSearchInput!.closest('div[class*="md:hidden"]')!
        ).getByRole("link", { name: "Popular" })
      ).toBeVisible();

      // Close mobile menu
      fireEvent.click(mobileMenuButton);
      await waitFor(() =>
        expect(screen.getByTestId("lucide-menu-icon")).toBeInTheDocument()
      );

      expect(mobileSearchInput).not.toBeVisible();
      expect(screen.queryByTestId("lucide-x-icon")).not.toBeInTheDocument();
    });

    test("mobile menu contains navigation links and search input", async () => {
      render(<SiteHeader />);
      const mobileMenuButton = screen.getByRole("button", {
        name: "Toggle menu",
      });
      fireEvent.click(mobileMenuButton); // Open mobile menu

      await waitFor(() =>
        expect(screen.getByTestId("lucide-x-icon")).toBeInTheDocument()
      );

      // Find the mobile menu container. This is tricky without a test-id.
      // We assume the X icon is within the mobile header part, and the menu is a sibling or child structure.
      // The mobile menu div has classes "md:hidden fixed inset-0..."
      const mobileMenuContainer = screen
        .getByTestId("lucide-x-icon")
        .closest('div[class*="md:hidden"][class*="fixed"]') as HTMLElement;

      expect(mobileMenuContainer).toBeInTheDocument();

      // Search input in mobile menu
      expect(
        within(mobileMenuContainer).getByPlaceholderText(
          "Search movies, shows..."
        )
      ).toBeVisible();

      // Check for some navigation links (these are simplified in the component's mobile section)
      expect(
        within(mobileMenuContainer).getByRole("link", { name: "Popular" })
      ).toBeVisible(); // Movie Popular
      expect(
        within(mobileMenuContainer).getByRole("link", { name: "Now Playing" })
      ).toBeVisible();
      expect(
        within(mobileMenuContainer).getByRole("link", { name: "Airing Today" })
      ).toBeVisible(); // TV Show
      expect(
        within(mobileMenuContainer).getByRole("link", {
          name: "Popular People",
        })
      ).toBeVisible(); // People
      expect(
        within(mobileMenuContainer).getByRole("button", { name: "Login" })
      ).toBeVisible();
    });

    test("mobile search input does not trigger navigate on change (as per component code)", async () => {
      render(<SiteHeader />);
      const mobileMenuButton = screen.getByRole("button", {
        name: "Toggle menu",
      });
      fireEvent.click(mobileMenuButton);
      await waitFor(() => screen.getByTestId("lucide-x-icon"));

      const allSearchInputs = screen.getAllByPlaceholderText(
        "Search movies, shows..."
      );
      const mobileSearchInput = allSearchInputs.find(
        (input) => input.closest(".md\\:hidden") && !input.closest(".md\\:flex")
      );

      expect(mobileSearchInput).toBeInTheDocument();
      if (mobileSearchInput) {
        fireEvent.change(mobileSearchInput, {
          target: { value: "Test Search" },
        });
      }
      // Based on the provided SiteHeader code, the mobile search input does not have an onChange handler
      // that calls `handleChange` or `navigate`. So, `mockNavigateFunction` should not be called.
      expect(mockNavigateFunction).not.toHaveBeenCalled();
    });
  });

  describe("Desktop Dropdown Navigation Links", () => {
    const testDropdownLink = async (
      buttonName: RegExp,
      linkName: string,
      expectedPath: string,
      expectedSearch: object
    ) => {
      render(<SiteHeader />);
      const dropdownTrigger = screen.getByRole("button", { name: buttonName });
      fireEvent.click(dropdownTrigger);

      // Wait for the dropdown item (which is our mocked Link) to appear and find it
      const linkElement = await screen.findByRole("link", { name: linkName });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", expectedPath);
      expect(linkElement).toHaveAttribute(
        "data-search-params",
        JSON.stringify(expectedSearch)
      );

      // Clicking the mocked Link won't call mockNavigateFunction because Link itself is mocked.
      // This test verifies that the Link component is rendered with the correct props.
      fireEvent.click(linkElement);
      expect(mockNavigateFunction).not.toHaveBeenCalled(); // Correct, as Link is mocked
    };

    test("Movies dropdown links are rendered correctly", async () => {
      await testDropdownLink(/Movies/i, "Popular Movies", "/movie", {
        search: "popular_movies",
        genre: "",
        year: "",
      });
    });

    test("Genre dropdown links are rendered correctly", async () => {
      await testDropdownLink(/Genre/i, "Action Genre", "/movie", {
        genre: "28",
        search: "",
        year: "",
      });
    });

    test("Year dropdown links are rendered correctly", async () => {
      await testDropdownLink(/Year/i, "2024", "/movie", {
        genre: "",
        year: "2024",
        search: "",
      });
    });

    test("TV Shows dropdown links are rendered correctly", async () => {
      await testDropdownLink(/TV Shows/i, "Popular TV Shows", "/tvShows", {
        search: "popular_tv",
      });
    });
  });
});
