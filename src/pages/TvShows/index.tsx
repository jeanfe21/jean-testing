import GetData from "../../@core/hook/FetchingData";

import type { GetTvShowsResponse } from "../../interface/tvshows/GetTvShowsResponse";
import HeroSection from "./component/HeroSection";

import Loading from "../../components/root/Loading";
import TopRated from "./component/TopRated";
import AllTvShows from "./component/AllTVshow";

const TvShowsPage = () => {
  const { data: listTvShows, isLoading } = GetData<GetTvShowsResponse>(
    `/trending/tv/day?language=en-US`,
    ["getTvShows"],
    {
      page: 1,
    },
    {
      results: [],
    }
  );

  if (!listTvShows || listTvShows.results.length == 0 || isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const { results } = listTvShows;
  const heroData = results[3];
  return (
    <div className="bg-black ">
      <HeroSection
        date={heroData.first_air_date}
        title={heroData.name}
        description={heroData.overview}
        imageUrl={`https://image.tmdb.org/t/p/original/${heroData.poster_path}`}
        rating={`${heroData.vote_average}`}
      />
      <TopRated movieData={listTvShows} />
      <AllTvShows />
    </div>
  );
};

export default TvShowsPage;
