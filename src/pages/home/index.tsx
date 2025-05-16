import GetData from "../../@core/hook/FetchingData";
import Loading from "../../components/root/Loading";
import type { GetMovieResponse } from "../../interface/movie/GetListMovieResponse";
import HeroSection from "./component/HeroSection";
import NewUpdate from "./component/NewUpdate";
import TopMovie from "./component/TopMovie";
import TvShow from "./component/TvShows";

const HomePage = () => {
  const { data: listMoviePopular, isLoading } = GetData<GetMovieResponse>(
    `/movie/popular`,
    ["getPopularMovie"],
    {
      page: 1,
    },
    {
      results: [],
    }
  );

  if (!listMoviePopular || listMoviePopular.results.length == 0 || isLoading) {
    return <Loading />;
  }
  const { results } = listMoviePopular;
  const heroData = results[1];

  return (
    <main className="min-h-screen bg-black/90">
      <HeroSection
        date={heroData.release_date}
        title={heroData.title}
        description={heroData.overview}
        imageUrl={`https://image.tmdb.org/t/p/original/${heroData.poster_path}`}
        rating={`${heroData.vote_average}`}
      />
      <TopMovie movieData={listMoviePopular} />
      <NewUpdate />
      <TvShow />
    </main>
  );
};

export default HomePage;
