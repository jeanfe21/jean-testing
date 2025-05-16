import type { GetMovieResponse } from "../../interface/movie/GetListMovieResponse";
import GetData from "../../@core/hook/FetchingData";
import MovieCard from "../../components/movie/MovieCard";
import Container from "../../components/root/Container";
import Loading from "../../components/root/Loading";
import { findMovie } from "../../@core/utils/findMovie";
interface Props {
  search: string;
  genre: number | string;
  year: number | string;
}

const MoviePage = ({ year, genre, search }: Props) => {
  const {
    data: listMovie,
    isLoading,
    isFetching,
  } = GetData<GetMovieResponse>(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    ["getListMovie", genre, year],
    {
      page: 1,
      with_genres: genre || "",
      primary_release_year: year || "",
    },
    {
      results: [],
    }
  );

  const { data: nowPlaying, isFetching: fetchNowPlaying } =
    GetData<GetMovieResponse>(
      `/movie/${search}?language=en-US&page=1`,
      ["nowplaying", search],
      {
        page: 1,
      },
      {
        results: [],
      },
      findMovie(search) && search !== "all" ? true : false
    );
  const { data: searchMovie, isFetching: fetchSearch } =
    GetData<GetMovieResponse>(
      `/search/movie?query=${search}&include_adult=false`,
      ["nowplaying", search],
      {
        page: 1,
        language: "en-US",
      },
      {
        results: [],
      },
      findMovie(search) ? false : true
    );
  if (!listMovie || isLoading || isFetching || fetchNowPlaying || fetchSearch) {
    return <Loading />;
  }

  const resultData = () => {
    if (searchMovie && searchMovie.results.length > 0) {
      return searchMovie.results;
    }
    if (findMovie(search) && nowPlaying && search !== "all") {
      return nowPlaying?.results;
    }
    return listMovie.results;
  };

  return (
    <Container className="bg-black grid pt-40 sm: grid-cols-2 gap-10  md:grid-cols-4">
      {resultData().map((item, index) => (
        <MovieCard
          id={`${item.id}`}
          key={index}
          description={item.overview}
          duration={"1h 44m"}
          imageUrl={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
          rating={item.vote_average}
          title={item.title}
          year={item.release_date}
          genres={item.genre_ids}
        />
      ))}
    </Container>
  );
};

export default MoviePage;
