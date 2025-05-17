import type { MovieCardProps } from "./moviecard";

describe("MovieCardProps Interface", () => {
  it("should have the correct properties", () => {
    const movieCardProps: MovieCardProps = {
      title: "Test Movie",
      year: 2023,
      rating: 8.5,
      duration: "2h 30m",
      genres: ["Action", "Sci-Fi"],
      description: "This is a test movie.",
      imageUrl: "test-image.jpg",
    };

    expect(movieCardProps.title).toBeDefined();
    expect(movieCardProps.year).toBeDefined();
    expect(movieCardProps.rating).toBeDefined();
    expect(movieCardProps.duration).toBeDefined();
    expect(movieCardProps.genres).toBeDefined();
    expect(movieCardProps.description).toBeDefined();
    expect(movieCardProps.imageUrl).toBeDefined();
  });
});
