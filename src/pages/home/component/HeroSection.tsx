import Container from "../../../components/root/Container";
import { Button } from "../../../components/ui/button";
import { Calendar, Clock, Play, Star } from "lucide-react";

interface Props {
  title: string;
  description: string;
  rating: string;
  date: string;
  imageUrl: string;
}

const HeroSection = ({ title, date, description, rating, imageUrl }: Props) => {
  return (
    <Container className="relative h-screen  ">
      {/* Background Image */}
      <div className="absolute bg-red-900 inset-0 z-0">
        <img
          src={imageUrl}
          alt="The Royal Princess"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-xl pt-20">
          <h1 className="text-5xl elegant-title mb-3">{title}</h1>
          <div className="flex items-center gap-4 mt-4 text-white/80 text-sm mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>1h 60m</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
          </div>
          <p className="text-lg elegant-subtitle mb-8">{description}</p>

          <div className="flex space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center gap-2">
              <Play className="h-4 w-4 fill-white text-white" />
              EXPLORE MORE
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-gray-700 hover:bg-white/10 rounded-md"
            >
              WATCH TRAILSER
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
