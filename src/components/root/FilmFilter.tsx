"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Sample film data
const films = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    duration: 142,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    rating: 9.2,
    duration: 175,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    duration: 152,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    duration: 154,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "Fight Club",
    year: 1999,
    genre: ["Drama"],
    rating: 8.8,
    duration: 139,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
    duration: 148,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    duration: 136,
    poster: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    duration: 146,
    poster: "/placeholder.svg?height=400&width=300",
  },
];

// Get all unique genres from the film data
const allGenres = Array.from(
  new Set(films.flatMap((film) => film.genre))
).sort();

// Popular genres for tabs (first 8 genres plus "All")
const popularGenres = ["All", ...allGenres.slice(0, 7)];

// Year options
const yearOptions = [
  { label: "All Years", value: "all" },
  { label: "2020s", value: "2020" },
  { label: "2010s", value: "2010" },
  { label: "2000s", value: "2000" },
  { label: "1990s", value: "1990" },
  { label: "1980s", value: "1980" },
  { label: "1970s", value: "1970" },
  { label: "Older", value: "older" },
];

// Rating options
const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "9+", value: "9" },
  { label: "8+", value: "8" },
  { label: "7+", value: "7" },
  { label: "6+", value: "6" },
  { label: "5+", value: "5" },
];

export default function FilmFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [filteredFilms, setFilteredFilms] = useState(films);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tabsRef = useRef<HTMLDivElement>(null);

  // Check if tabs can be scrolled
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Scroll tabs left or right
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? tabsRef.current.scrollLeft - scrollAmount
          : tabsRef.current.scrollLeft + scrollAmount;

      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Initialize scroll check
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Handle tab click
  const handleTabClick = (genre: string) => {
    if (genre === "All") {
      setSelectedGenres([]);
      setActiveTab("All");
    } else {
      setSelectedGenres([genre]);
      setActiveTab(genre);
    }
  };

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const filtered = films.filter((film) => {
      // Search query filter
      const matchesSearch = film.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Genre filter
      const matchesGenre =
        selectedGenres.length === 0 ||
        film.genre.some((genre) => selectedGenres.includes(genre));

      // Year filter
      let matchesYear = true;
      if (selectedYear !== "all") {
        if (selectedYear === "older") {
          matchesYear = film.year < 1970;
        } else {
          const decade = Number.parseInt(selectedYear);
          matchesYear = film.year >= decade && film.year < decade + 10;
        }
      }

      // Rating filter
      let matchesRating = true;
      if (selectedRating !== "all") {
        const minRating = Number.parseInt(selectedRating);
        matchesRating = film.rating >= minRating;
      }

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });

    setFilteredFilms(filtered);

    // Show results if there's a search query or active filters
    const hasActiveFilters =
      searchQuery ||
      selectedGenres.length > 0 ||
      selectedYear !== "all" ||
      selectedRating !== "all";
    setShowResults(hasActiveFilters);

    // Update active tab based on selected genres
    if (selectedGenres.length === 0) {
      setActiveTab("All");
    } else if (selectedGenres.length === 1) {
      setActiveTab(selectedGenres[0]);
    } else {
      setActiveTab(""); // Multiple genres selected
    }
  }, [searchQuery, selectedGenres, selectedYear, selectedRating]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre];

      // Update active tab
      if (newGenres.length === 0) {
        setActiveTab("All");
      } else if (newGenres.length === 1) {
        setActiveTab(newGenres[0]);
      } else {
        setActiveTab(""); // Multiple genres selected
      }

      return newGenres;
    });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setActiveTab("All");
    setSelectedYear("all");
    setSelectedRating("all");
    setShowResults(false);
  };

  // Count active filters
  const activeFilterCount = [
    selectedYear !== "all",
    selectedRating !== "all",
    // Don't count genres here since they're shown in tabs
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <style>{styles}</style>

      {/* Header section with search and filters */}
      <div className="relative mx-auto max-w-3xl space-y-4">
        {/* Search bar with filter button */}
        <div
          className="flex items-center justify-between rounded-full bg-black/40 backdrop-blur-md px-4 py-2.5"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center flex-1">
            <Search className="h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search for Movie"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-3 flex-1 bg-transparent text-white placeholder-white/70 outline-none"
            />
          </div>

          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <button
                className={cn(
                  "text-white/70 hover:text-white transition-colors relative",
                  activeFilterCount > 0 && "text-white"
                )}
              >
                <SlidersHorizontal className="h-5 w-5" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <DialogContent className="sm:max-w-[400px] border-none bg-black/80 backdrop-blur-xl shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] rounded-xl p-0 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-white">
                      Filter Movies
                    </DialogTitle>
                  </DialogHeader>
                </div>

                <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-white">Genre</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {allGenres.map((genre) => (
                          <div
                            key={genre}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() => handleGenreChange(genre)}
                              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white"
                            />
                            <Label
                              htmlFor={`genre-${genre}`}
                              className="text-sm text-white/90 cursor-pointer"
                            >
                              {genre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-white">Year</h3>
                      <Select
                        value={selectedYear}
                        onValueChange={setSelectedYear}
                      >
                        <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-9">
                          <SelectValue placeholder="Select year range" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
                          {yearOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-white/10"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-white">Rating</h3>
                      <Select
                        value={selectedRating}
                        onValueChange={setSelectedRating}
                      >
                        <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-9">
                          <SelectValue placeholder="Select minimum rating" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
                          {ratingOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-white/10"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 mt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      Clear All
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsFilterOpen(false)}
                      className="bg-white text-black hover:bg-white/90 border-none"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>

        {/* Genre tabs */}
        <div className="relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollTabs("left")}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm rounded-full p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Tabs container */}
          <div
            className="relative overflow-x-auto hide-scrollbar"
            ref={tabsRef}
            onScroll={checkScroll}
          >
            <div className="flex space-x-2 px-1 min-w-max">
              {popularGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleTabClick(genre)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    activeTab === genre
                      ? "bg-white text-black font-medium"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => scrollTabs("right")}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 backdrop-blur-sm rounded-full p-1 text-white/70 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Film grid */}
      {(showResults || activeTab !== "All") && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">
              {filteredFilms.length} Films
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-[160px] h-8 bg-black/40 border-white/10 text-white text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="year-new">Sort by Year (Newest)</SelectItem>
                <SelectItem value="year-old">Sort by Year (Oldest)</SelectItem>
                <SelectItem value="title">Sort by Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredFilms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredFilms.map((film) => (
                <div
                  key={film.id}
                  className="group relative overflow-hidden rounded-lg transition-all duration-300"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                    <img
                      src={film.poster || "/placeholder.svg"}
                      alt={film.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="font-medium">{film.title}</h3>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span>{film.year}</span>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-white text-white" />
                        <span>{film.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium truncate text-white">
                      {film.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-sm text-white/60">
                      <span>{film.year}</span>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-white/70 text-white/70" />
                        <span>{film.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-black/20 backdrop-blur-sm rounded-lg">
              <div className="mb-3 rounded-full bg-white/5 p-2">
                <X className="h-5 w-5 text-white/50" />
              </div>
              <h3 className="mb-2 text-base font-medium text-white">
                No films found
              </h3>
              <p className="mb-3 text-sm text-white/70">
                Try adjusting your filters
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
