"use client";

import { useState, useEffect } from "react";
import { Search, Menu, X, Film, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { genreData, movieItem, tvshowItem, year } from "./data/header";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate({ from: "/movie" });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (value: string) => {
    navigate({
      search: (old) => ({
        ...old,
        search: value ? value : "",
      }),
      replace: true,
    });
  };
  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-20",
        isScrolled
          ? "bg-black/90 backdrop-blur-sm py-7 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/80 to-transparent py-8 "
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-10">
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-md p-1.5">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white uppercase tracking-wider">
              TheMovie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 hover:bg-white/5 flex items-center gap-1"
                >
                  Movies
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-zinc-900/95 backdrop-blur-sm border-zinc-800"
              >
                {movieItem.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                    >
                      <Link
                        search={{
                          search: item.id,
                          genre: "",
                          year: "",
                        }}
                        to="/movie"
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 hover:bg-white/5 flex items-center gap-1"
                >
                  Genre
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-zinc-900/95 backdrop-blur-sm border-zinc-800"
              >
                {genreData.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                    >
                      <Link
                        search={{
                          genre: item.id,
                          search: "",
                          year: "",
                        }}
                        to="/movie"
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 hover:bg-white/5 flex items-center gap-1"
                >
                  Year
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-zinc-900/95 backdrop-blur-sm border-zinc-800"
              >
                {year.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                    >
                      <Link
                        search={{
                          genre: "",
                          year: item,
                          search: "",
                        }}
                        to="/movie"
                      >
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 hover:bg-white/5 flex items-center gap-1"
                >
                  TV Shows
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="bg-zinc-900/95 backdrop-blur-sm border-zinc-800"
              >
                {tvshowItem.map((item, index) => {
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                    >
                      <Link
                        search={{
                          search: item.id,
                        }}
                        to="/tvShows"
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="text-white hover:text-purple-300 hover:bg-white/5 flex items-center gap-1"
            >
              <Link to="/people">Popular People</Link>
            </Button>
          </nav>

          {/* Search and Login */}
          <div className="flex items-center gap-2 z-10">
            {/* Desktop Search */}
            <div
              className={cn(
                "hidden md:flex items-center transition-all duration-300 overflow-hidden",
                searchOpen ? "w-64" : "w-10"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-purple-300 hover:bg-white/5"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Input
                type="search"
                placeholder="Search movies, shows..."
                onChange={(e) => handleChange(e.target.value)}
                className={cn(
                  "bg-transparent border-0 border-b border-white/20 text-white rounded-none focus-visible:ring-0 focus-visible:border-purple-500 transition-all duration-300 pl-1",
                  searchOpen ? "w-full opacity-100" : "w-0 opacity-0"
                )}
              />
            </div>

            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white border-0"
              size="sm"
            >
              Login
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-purple-300 hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-300 flex flex-col pt-20 px-6",
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                type="search"
                placeholder="Search movies, shows..."
                className="w-full bg-white/10 border-white/20 text-white pl-10"
              />
            </div>
          </div>

          <nav className="flex flex-col space-y-1">
            <div className="py-2 px-3 text-white/60 text-sm font-medium">
              Movies
            </div>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Popular
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Now Playing
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Upcoming
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Top Rated
            </Link>

            <div className="py-2 px-3 text-white/60 text-sm font-medium mt-4">
              TV Shows
            </div>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Popular
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Airing Today
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              On TV
            </Link>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Top Rated
            </Link>

            <div className="py-2 px-3 text-white/60 text-sm font-medium mt-4">
              People
            </div>
            <Link
              to="/"
              className="py-2 px-3 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Popular People
            </Link>
          </nav>

          <div className="mt-auto mb-8">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
