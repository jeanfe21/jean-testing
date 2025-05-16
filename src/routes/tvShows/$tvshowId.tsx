import { createFileRoute } from "@tanstack/react-router";
import TvShowDetailPage from "../../pages/detailTvShow";

export const Route = createFileRoute("/tvShows/$tvshowId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.tvshowId,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useLoaderData();
  return (
    <div>
      <TvShowDetailPage id={`${id}`} />
    </div>
  );
}
