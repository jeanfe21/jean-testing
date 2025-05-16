import Container from "../../../components/root/Container";

import type { GetTvShowsResponse } from "../../../interface/tvshows/GetTvShowsResponse";
import GetData from "../../../@core/hook/FetchingData";
import Loading from "../../../components/root/Loading";
import TvShowCard from "./TvShowCard";

const AllTvShows = () => {
  const { data: movieData } = GetData<GetTvShowsResponse>(
    `/tv/popular`,
    ["getTvShow"],
    {
      page: 1,
      language: "en-US",
    },
    {
      results: [],
    }
  );

  if (!movieData) {
    return <Loading />;
  }

  return (
    <Container className="mt-7">
      <div className="flex gap-10   items-center mb-10">
        <h2 className="text-2xl font-bold text-white">All Tv Show</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movieData.results.map((item, index) => (
          <TvShowCard
            id={`${item.id}`}
            key={index}
            description={item.overview}
            duration={"1h 44m"}
            imageUrl={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            rating={item.vote_average}
            title={item.name}
            year={item.first_air_date}
            genres={item.genre_ids}
          />
        ))}
      </div>
    </Container>
  );
};

export default AllTvShows;
