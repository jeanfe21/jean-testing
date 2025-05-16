import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people/$peopleId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/people/$peopleId"!</div>;
}
