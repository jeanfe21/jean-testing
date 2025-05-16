"use client";

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

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import MovieNotFound from "./Components/MovieNotFound";
import Loading from "../../components/root/Loading";
import type { GetDetailMovieResponse } from "../../interface/movie/GetDetailMovieResponse";
import GetData from "../../@core/hook/FetchingData";
import SimiliarMovies from "./Components/SimiliarMovies";
import { useEffect } from "react";

export default function TvShowDetailPage({ id }: { id: string }) {
  const { data: detailMovie, isLoading } = GetData<GetDetailMovieResponse>(
    `/tv/${id}?language=en-US`,
    ["getdetailTvShow", id]
  );

  useEffect(() => {
    scrollTo({
      top: 0,
    });
  }, [id]);

  if (!detailMovie) {
    return <div>No Movies Found</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!detailMovie) {
    return <MovieNotFound />;
  }

  // const similarMovies: ContentCardProps[] = movie.similarMovies.map(
  //   (similar) => ({
  //     title: similar.title,
  //     image: similar.posterPath,
  //     year: new Date(similar.releaseDate).getFullYear().toString(),
  //     category: similar.genres[0]?.name || "DRAMA",
  //     rating: similar.voteAverage,
  //   })
  // );

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-purple-900/40 via-black to-black">
        {/* Hero Section with Backdrop */}
        <section className="relative pt-40 px-20 pb-20 ">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={`https://image.tmdb.org/t/p/original/${detailMovie.poster_path}`}
              alt={detailMovie.title}
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
                  src={`https://image.tmdb.org/t/p/original/${detailMovie.poster_path}`}
                  alt={detailMovie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* detailMovie Info */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {detailMovie.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {detailMovie.title}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-white/80 text-sm mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                    <span>{detailMovie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {Math.floor(detailMovie.runtime / 60)}h{" "}
                      {detailMovie.runtime % 60}m
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(detailMovie.release_date).getFullYear()}
                    </span>
                  </div>
                </div>

                <p className="text-white/90 mb-6 max-w-3xl">
                  {detailMovie.overview}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-gray-800 hover:text-white rounded-md flex items-center gap-2">
                    <Play className="h-4 w-4 fill-white text-white" />
                    WATCH NOW
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-gray-800 hover:bg-white/10 hover:text-white rounded-md flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    WATCH TRAILER
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-gray-800 hover:bg-white/10 hover:text-white rounded-md flex items-center gap-2"
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
        <section className="bg-zinc-900/80 px-20 backdrop-blur-sm py-3 border-t border-b border-white/10">
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
                  {detailMovie.vote_count.toLocaleString()}
                </span>{" "}
                votes
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="container px-20 mx-auto  py-10 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm">Original Title</h3>
                  <p className="text-white">{detailMovie.original_title}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Release Date</h3>
                  <p className="text-white">
                    {new Date(detailMovie.release_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Language</h3>
                  <p className="text-white">
                    {detailMovie.original_language.toUpperCase()}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Budget</h3>
                  <p className="text-white">
                    {detailMovie.budget > 0
                      ? `$${detailMovie.budget.toLocaleString()}`
                      : "Not Available"}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm">Revenue</h3>
                  <p className="text-white">
                    {detailMovie.revenue > 0
                      ? `$${detailMovie.revenue.toLocaleString()}`
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
                    {detailMovie.production_companies.map((company) => (
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
                    {detailMovie.production_countries.map((country) => (
                      <Badge
                        key={country.iso_3166_1}
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

        <SimiliarMovies id={id} />
      </main>
    </>
  );
}
