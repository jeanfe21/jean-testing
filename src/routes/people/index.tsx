import { createFileRoute } from "@tanstack/react-router";
import PeoplePage from "../../pages/people";

export const Route = createFileRoute("/people/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PeoplePage />
    </div>
  );
}
