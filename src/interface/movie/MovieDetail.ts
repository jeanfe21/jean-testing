export interface ContentCardProps {
  title: string;
  image: string;
  year: string;
  category: string;
  episodeNumber?: number;
  episodeTitle?: string;
  rating?: number;
  isNew?: boolean;
  id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface ProductionCountry {
  iso: string;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  department: string;
  job: string;
  profilePath: string | null;
}

export interface SimilarMovie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  genres: Genre[];
}

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  tagline: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
  budget: number;
  revenue: number;
  originalLanguage: string;
  status: string;
  voteAverage: number;
  voteCount: number;
  genres: Genre[];
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  cast: Cast[];
  crew: Crew[];
  similarMovies: SimilarMovie[];
}
