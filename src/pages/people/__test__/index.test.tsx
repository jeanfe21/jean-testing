import { render, screen, waitFor } from "@testing-library/react";
import PeoplePage from "../index";
import GetData from "../../../@core/hook/FetchingData";

// Mock the GetData hook
jest.mock("../../../@core/hook/FetchingData");

describe("PeoplePage Component", () => {
  const mockPeopleData = {
    results: [
      {
        id: 1,
        name: "Person 1",
        popularity: 7.5,
        profile_path: "/profile1.jpg",
        known_for: [{ title: "Movie 1" }],
      },
      {
        id: 2,
        name: "Person 2",
        popularity: 8.0,
        profile_path: "/profile2.jpg",
        known_for: [{ title: "Movie 2" }],
      },
    ],
  };

  beforeEach(() => {
    (GetData as jest.Mock).mockClear();
  });

  it("should render PeoplePage component with people data", async () => {
    (GetData as jest.Mock).mockReturnValue({
      data: mockPeopleData,
    });

    render(<PeoplePage />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("Person 1")).toBeInTheDocument();
    });

    // Check if the component renders with the correct data
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  it('should render "No Movies Found" when data is not available', () => {
    (GetData as jest.Mock).mockReturnValue({
      data: null,
    });

    render(<PeoplePage />);

    // Check if the "No Movies Found" message is rendered
    expect(screen.getByText("No Movies Found")).toBeInTheDocument();
  });
});
