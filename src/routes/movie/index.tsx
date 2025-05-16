import { createFileRoute } from "@tanstack/react-router";
import MoviePage from "../../pages/movie";

export const Route = createFileRoute("/movie/")({
  component: RouteComponent,
  validateSearch: (params) => {
    return {
      search: (params.search as string) || "",
      genre: (params.genre as number) || "",
      year: (params.year as number) || "",
    };
  },
  loaderDeps: ({ search: { search, genre, year } }) => ({
    search,
    genre,
    year,
  }),
  loader: async ({ deps: { search, genre, year } }) => {
    return {
      search,
      genre,
      year,
    };
  },
});

function RouteComponent() {
  const params = Route.useLoaderData();
  const { ...searchparams } = params;
  return (
    <div>
      <MoviePage {...searchparams} />
    </div>
  );
}
