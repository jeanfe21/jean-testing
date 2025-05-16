import { createFileRoute } from "@tanstack/react-router";
import TvShowsPage from "../../pages/TvShows";

export const Route = createFileRoute("/tvShows/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TvShowsPage />
    </div>
  );
}
