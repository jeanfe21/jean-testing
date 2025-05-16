import Container from "../../../components/root/Container";

import { checkNew } from "../../../@core/utils/checkNew";
import type { GetTvShowsResponse } from "../../../interface/tvshows/GetTvShowsResponse";
import { ContentCard } from "../../home/component/ContentCard";

const TopRated = ({ movieData }: { movieData: GetTvShowsResponse }) => {
  return (
    <Container className="mt-7">
      <div className="flex gap-10   items-center mb-10">
        <h2 className="text-2xl font-bold text-white">Trending TV Shows</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movieData.results.slice(0, 6).map((item) => (
          <ContentCard
            key={item.name}
            id={`${item.id}`}
            image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            rating={item.vote_average}
            title={item.name}
            year={item.first_air_date}
            category={`${item.genre_ids[1]}`}
            isNew={checkNew({ date: item.first_air_date })}
          />
        ))}
      </div>
    </Container>
  );
};

export default TopRated;
