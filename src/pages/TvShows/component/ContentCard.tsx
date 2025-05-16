import { Badge } from "@/components/ui/badge";
import { findGenre } from "../../../@core/utils/findGenre";
import { useNavigate } from "@tanstack/react-router";

interface ContentCardProps {
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

export function ContentCard({
  title,
  image,
  year,
  category,
  episodeNumber,
  episodeTitle,
  rating,
  isNew = false,
  id,
}: ContentCardProps) {
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    navigate({
      to: "/tvShows/$tvshowId",
      params: {
        tvshowId: value,
      },
    });
  };
  return (
    <div className="group relative overflow-hidden rounded-t-lg">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {rating && (
          <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 text-xs text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-yellow-400 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {rating}
          </div>
        )}
        {episodeNumber && (
          <div className="absolute top-2 left-2 bg-purple-600 rounded-md px-2 py-1 text-xs text-white">
            Episode {episodeNumber}
            {episodeTitle && `: ${episodeTitle}`}
          </div>
        )}
      </div>
      <div className="mt-2">
        <div
          onClick={() => handleClick(id)}
          className="text-sm cursor-pointer font-medium text-white"
        >
          {title}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-400">{year}</span>
          <Badge
            variant="outline"
            className="text-[10px] py-0 h-4 border-gray-600 text-gray-400"
          >
            {findGenre(category)}
          </Badge>
          {isNew && (
            <Badge className="text-[10px] py-0 h-4 bg-purple-600 hover:bg-purple-700">
              NEW
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
