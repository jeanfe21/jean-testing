import { createFileRoute } from "@tanstack/react-router";
import MovieDetailPage from "../../pages/detailMovie";

export const Route = createFileRoute("/movie/$movieId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.movieId,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useLoaderData();
  return (
    <div>
      <MovieDetailPage id={id} />
    </div>
  );
}
