"use client";

import { useEffect, useState } from "react";

import {
  Play,
  Star,
  Clock,
  Calendar,
  Heart,
  Share2,
  Download,
  Plus,
} from "lucide-react";
import type {
  ContentCardProps,
  Movie,
} from "../../interface/movie/MovieDetail";
import { fetchMovieDetails } from "../home/dummyData/detailMovie";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ContentCard } from "../home/component/ContentCard";
import Loading from "../../components/root/Loading";

export default function TvShowDetailPage({ id }: { id: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from an API using the ID
        const data = await fetchMovieDetails("royal-princess");
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-900/40 via-black to-black pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                Movie Not Found
              </h1>
              <p className="text-white/70">
                The movie you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const similarMovies: ContentCardProps[] = movie.similarMovies.map(
    (similar) => ({
      title: similar.title,
      image: similar.posterPath,
      year: new Date(similar.releaseDate).getFullYear().toString(),
      category: similar.genres[0]?.name || "DRAMA",
      rating: similar.voteAverage,
      id: `${similar.id}`,
    })
  );

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-purple-900/40 via-black to-black">
        {/* Hero Section with Backdrop */}
        <section className="relative pt-40 pb-20 ">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={"/image/home-image.jpg"}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* Poster */}
              <div className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-2xl shadow-black/50 flex-shrink-0">
                <img
                  src={"/image/home-image.jpg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-white/80 text-sm mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                    <span>{movie.voteAverage.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>

                <p className="text-white/90 mb-6 max-w-3xl">{movie.overview}</p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2">
                    <Play className="h-4 w-4 fill-white text-white" />
                    WATCH NOW
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-md flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    WATCH TRAILER
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-md flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    ADD TO LIST
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <section className="bg-zinc-900/80 backdrop-blur-sm py-3 border-t border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="hidden sm:inline">Favorite</span>
                </button>
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Download className="h-5 w-5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
              <div className="text-white/80">
                <span className="font-medium">
                  {movie.voteCount.toLocaleString()}
                </span>{" "}
                votes
              </div>
            </div>
          </div>
        </section>

        {/* Cast & Crew Section */}
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-white mb-6">Cast & Crew</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.slice(0, 6).map((person) => (
              <div
                key={person.id}
                className="bg-zinc-900/50 rounded-lg overflow-hidden"
              >
                <div className="aspect-[2/3] w-full overflow-hidden">
                  <img
                    src={
                      person.profilePath ||
                      "/placeholders/person-placeholder.jpg"
                    }
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white text-sm">
                    {person.name}
                  </h3>
                  <p className="text-white/60 text-xs">{person.character}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium text-white mb-4">Director</h3>
            <div className="flex items-center gap-3">
              {movie.crew
                .filter((person) => person.job === "Director")
                .map((director) => (
                  <div
                    key={director.id}
                    className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-lg"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={
                          director.profilePath ||
                          "/placeholders/person-placeholder.jpg"
                        }
                        alt={director.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {director.name}
                      </h4>
                      <p className="text-white/60 text-sm">Director</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="container mx-auto px-4 py-10 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm">Original Title</h3>
                  <p className="text-white">{movie.originalTitle}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Release Date</h3>
                  <p className="text-white">
                    {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Language</h3>
                  <p className="text-white">
                    {movie.originalLanguage.toUpperCase()}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Budget</h3>
                  <p className="text-white">
                    {movie.budget > 0
                      ? `$${movie.budget.toLocaleString()}`
                      : "Not Available"}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Revenue</h3>
                  <p className="text-white">
                    {movie.revenue > 0
                      ? `$${movie.revenue.toLocaleString()}`
                      : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Production</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm">
                    Production Companies
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.productionCompanies.map((company) => (
                      <Badge
                        key={company.id}
                        variant="outline"
                        className="border-gray-600 text-white"
                      >
                        {company.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">
                    Production Countries
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.productionCountries.map((country) => (
                      <Badge
                        key={country.iso}
                        variant="outline"
                        className="border-gray-600 text-white"
                      >
                        {country.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Movies Section */}
        <section className="container mx-auto px-4 py-10 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarMovies.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
