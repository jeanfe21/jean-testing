import type { Movie } from "../../../interface/movie/MovieDetail";

// This is a mock service that would normally fetch from an API
export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data for The Royal Princess
  if (id === "royal-princess" || !id) {
    return {
      id: 1,
      title: "The Royal Princess",
      originalTitle: "The Royal Princess",
      tagline: "Behind the crown lies a story of power, love, and betrayal",
      overview:
        '"The Royal Princess" is a captivating drama that delves into the life of Princess Isabella, the heir to a prestigious European throne. With political intrigue, forbidden romance, and royal responsibilities, Isabella must navigate the complex world of monarchy while finding her own voice and purpose. As she prepares to eventually take the crown, she discovers dark secrets about her family\'s past that threaten to unravel the very foundation of the kingdom.',
      posterPath: "/placeholders/royal-princess-poster.jpg",
      backdropPath: "/image/home-image.jpg",
      releaseDate: "2023-09-15",
      runtime: 142,
      budget: 85000000,
      revenue: 328000000,
      originalLanguage: "en",
      status: "Released",
      voteAverage: 8.7,
      voteCount: 3254,
      genres: [
        { id: 18, name: "DRAMA" },
        { id: 10752, name: "HISTORY" },
        { id: 10749, name: "ROMANCE" },
      ],
      productionCompanies: [
        { id: 1, name: "Royal Films", logoPath: null, originCountry: "US" },
        { id: 2, name: "Crown Studios", logoPath: null, originCountry: "UK" },
      ],
      productionCountries: [
        { iso: "US", name: "United States of America" },
        { iso: "UK", name: "United Kingdom" },
      ],
      cast: [
        {
          id: 101,
          name: "Emma Clarke",
          character: "Princess Isabella",
          profilePath: "/placeholders/cast-1.jpg",
          order: 0,
        },
        {
          id: 102,
          name: "Richard Montgomery",
          character: "King Edward",
          profilePath: "/placeholders/cast-2.jpg",
          order: 1,
        },
        {
          id: 103,
          name: "Olivia Bennett",
          character: "Queen Victoria",
          profilePath: "/placeholders/cast-3.jpg",
          order: 2,
        },
        {
          id: 104,
          name: "James Harrison",
          character: "Prince Thomas",
          profilePath: "/placeholders/cast-4.jpg",
          order: 3,
        },
        {
          id: 105,
          name: "Michael Reynolds",
          character: "Lord William",
          profilePath: "/placeholders/cast-5.jpg",
          order: 4,
        },
        {
          id: 106,
          name: "Sophia Martinez",
          character: "Lady Elizabeth",
          profilePath: "/placeholders/cast-6.jpg",
          order: 5,
        },
      ],
      crew: [
        {
          id: 201,
          name: "Victoria Reynolds",
          department: "Directing",
          job: "Director",
          profilePath: "/placeholders/crew-1.jpg",
        },
        {
          id: 202,
          name: "Jonathan Price",
          department: "Writing",
          job: "Screenplay",
          profilePath: "/placeholders/crew-2.jpg",
        },
      ],
      similarMovies: [
        {
          id: 301,
          title: "The Crowned Jewel",
          posterPath: "/placeholders/the-crowned-jewel.jpg",
          backdropPath: "/placeholders/the-crowned-jewel-backdrop.jpg",
          releaseDate: "2024-01-20",
          voteAverage: 9.2,
          genres: [{ id: 18, name: "DRAMA" }],
        },
        {
          id: 302,
          title: "Serendipity",
          posterPath: "/placeholders/serendipity.jpg",
          backdropPath: "/placeholders/serendipity-backdrop.jpg",
          releaseDate: "2024-02-14",
          voteAverage: 8.9,
          genres: [{ id: 10749, name: "ROMANCE" }],
        },
        {
          id: 303,
          title: "Whispers of Eternity",
          posterPath: "/placeholders/whispers-of-eternity.jpg",
          backdropPath: "/placeholders/whispers-of-eternity-backdrop.jpg",
          releaseDate: "2024-03-08",
          voteAverage: 9.3,
          genres: [{ id: 14, name: "FANTASY" }],
        },
        {
          id: 304,
          title: "Luminous Dreams",
          posterPath: "/placeholders/luminous-dreams.jpg",
          backdropPath: "/placeholders/luminous-dreams-backdrop.jpg",
          releaseDate: "2024-04-12",
          voteAverage: 8.7,
          genres: [{ id: 18, name: "DRAMA" }],
        },
        {
          id: 305,
          title: "Royal Blood",
          posterPath: "/placeholders/royal-blood.jpg",
          backdropPath: "/placeholders/royal-blood-backdrop.jpg",
          releaseDate: "2023-11-03",
          voteAverage: 8.5,
          genres: [{ id: 18, name: "DRAMA" }],
        },
        {
          id: 306,
          title: "The Last Monarch",
          posterPath: "/placeholders/the-last-monarch.jpg",
          backdropPath: "/placeholders/the-last-monarch-backdrop.jpg",
          releaseDate: "2023-08-25",
          voteAverage: 8.8,
          genres: [{ id: 36, name: "HISTORY" }],
        },
      ],
    };
  }

  // For any other ID, return a generic movie (in a real app, this would fetch from an API)
  return {
    id: Number.parseInt(id) || 999,
    title: "Sample Movie",
    originalTitle: "Sample Movie",
    tagline: "A sample movie for testing",
    overview: "This is a placeholder movie for testing the movie detail page.",
    posterPath: "/placeholders/default-poster.jpg",
    backdropPath: "/placeholders/default-backdrop.jpg",
    releaseDate: "2023-01-01",
    runtime: 120,
    budget: 50000000,
    revenue: 150000000,
    originalLanguage: "en",
    status: "Released",
    voteAverage: 7.5,
    voteCount: 1000,
    genres: [
      { id: 18, name: "DRAMA" },
      { id: 28, name: "ACTION" },
    ],
    productionCompanies: [
      { id: 1, name: "Sample Studios", logoPath: null, originCountry: "US" },
    ],
    productionCountries: [{ iso: "US", name: "United States of America" }],
    cast: [
      {
        id: 101,
        name: "Actor One",
        character: "Character One",
        profilePath: "/placeholders/default-cast.jpg",
        order: 0,
      },
      {
        id: 102,
        name: "Actor Two",
        character: "Character Two",
        profilePath: "/placeholders/default-cast.jpg",
        order: 1,
      },
      {
        id: 103,
        name: "Actor Three",
        character: "Character Three",
        profilePath: "/placeholders/default-cast.jpg",
        order: 2,
      },
      {
        id: 104,
        name: "Actor Four",
        character: "Character Four",
        profilePath: "/placeholders/default-cast.jpg",
        order: 3,
      },
      {
        id: 105,
        name: "Actor Five",
        character: "Character Five",
        profilePath: "/placeholders/default-cast.jpg",
        order: 4,
      },
      {
        id: 106,
        name: "Actor Six",
        character: "Character Six",
        profilePath: "/placeholders/default-cast.jpg",
        order: 5,
      },
    ],
    crew: [
      {
        id: 201,
        name: "Director Name",
        department: "Directing",
        job: "Director",
        profilePath: "/placeholders/default-crew.jpg",
      },
    ],
    similarMovies: Array(6)
      .fill(0)
      .map((_, index) => ({
        id: 300 + index,
        title: `Similar Movie ${index + 1}`,
        posterPath: "/placeholders/default-poster.jpg",
        backdropPath: "/placeholders/default-backdrop.jpg",
        releaseDate: "2023-01-01",
        voteAverage: 7.0 + index / 10,
        genres: [{ id: 18, name: "DRAMA" }],
      })),
  };
};
