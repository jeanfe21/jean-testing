import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

interface Props {
  imageUrl: string;
  name: string;
  popularity: string;
  knownFor: string;
  id: string;
}
const PeopleCard = ({ id, imageUrl, knownFor, name, popularity }: Props) => {
  return (
    <Link
      to={`/people/$peopleId`}
      params={{
        peopleId: id,
      }}
      className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-muted">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-yellow-500/90 text-black text-xs font-medium px-2 py-0.5 rounded-full">
            <Star className="h-3 w-3 fill-current" />
            <span>{popularity}</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold  text-lg text-white leading-tight">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{knownFor}</p>
      </div>
    </Link>
  );
};

export default PeopleCard;
