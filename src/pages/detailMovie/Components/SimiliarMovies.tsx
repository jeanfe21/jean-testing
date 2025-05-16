import GetData from "../../../@core/hook/FetchingData";
import { checkNew } from "../../../@core/utils/checkNew";
import Container from "../../../components/root/Container";
import type { GetSimiliarMovieResponse } from "../../../interface/movie/GetSimiliarMovies";
import { ContentCard } from "../../home/component/ContentCard";

const SimiliarMovies = ({ id }: { id: string }) => {
  const { data: similarMovies } = GetData<GetSimiliarMovieResponse>(
    `movie/${id}/similar?language=en-US&page=1`,
    ["getsimmiliarMovie"],
    {
      page: 1,
    },
    {
      results: [],
    }
  );
  return (
    <Container className="container mx-auto  py-10 border-t border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {similarMovies?.results
          .slice(0, 10)
          .map((item) => (
            <ContentCard
              id={`${item.id}`}
              key={item.id}
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

export default SimiliarMovies;
