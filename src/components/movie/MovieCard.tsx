import { Star, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { findGenre } from "../../@core/utils/findGenre";
import { useNavigate } from "@tanstack/react-router";

interface MovieCardProps {
  title: string;
  year: string;
  rating: number;
  duration: string;
  genres: number[];
  description: string;
  imageUrl: string;
  id: string;
}

export default function MovieCard({
  title,
  year,
  rating,
  duration,
  genres,
  description,
  imageUrl,
  id,
}: MovieCardProps) {
  const navigate = useNavigate({ from: "/movie" });

  const handleClick = (value: string) => {
    navigate({
      to: "/movie/$movieId",
      params: {
        movieId: value,
      },
    });
  };
  return (
    <Card className="bg-black/90 pt-0 overflow-hidden w-full max-w-sm transition-all hover:shadow-lg">
      <div className="relative">
        <div className="">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`${title} poster`}
            className="w-full h-[450px] object-cover"
          />
          <div className="w-full h-[450px] z-10 top-0 absolute bg-black/40" />
        </div>

        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-black/30 hover:bg-black/50 text-white"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        <div className="absolute bottom-0 z-20 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className="flex items-center gap-2 text-white/90">
            <span>{year}</span>
            <span>•</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {genres.map((genre, index) => (
            <Badge
              key={index}
              className="button-gradient  bg-purple-700 font-semibold text-white  "
            >
              {findGenre(genre)}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleClick(id)}
          className="w-full bg-gradient-to-r button-gradient text-white border-0"
          size="sm"
        >
          Detail Movie
        </Button>
      </CardFooter>
    </Card>
  );
}
