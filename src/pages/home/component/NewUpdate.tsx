import { ChevronRight } from "lucide-react";
import Container from "../../../components/root/Container";

import { ContentCard } from "./ContentCard";
import type { GetMovieResponse } from "../../../interface/movie/GetListMovieResponse";
import { checkNew } from "../../../@core/utils/checkNew";
import GetData from "../../../@core/hook/FetchingData";

const NewUpdate = () => {
  const { data: movieData } = GetData<GetMovieResponse>(
    `movie/now_playing`,
    ["getNewUpdate"],
    {
      page: 2,
      language: "en-US",
    },
    {
      results: [],
    }
  );

  if (!movieData) {
    return <>no data</>;
  }

  return (
    <Container className="mt-7">
      <div className="flex gap-10   items-center mb-10">
        <h2 className="text-2xl font-bold text-white">Now Playing</h2>
        <p className="text-purple-400 cursor-pointer flex  items-center gap-3">
          Explore More{" "}
          <span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movieData.results.slice(0, 6).map((item) => (
          <ContentCard
            id={`${item.id}`}
            key={item.title}
            image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            rating={item.vote_average}
            title={item.title}
            year={item.release_date}
            category={`${item.genre_ids[0]}`}
            isNew={checkNew({ date: item.release_date })}
          />
        ))}
      </div>
    </Container>
  );
};

export default NewUpdate;
