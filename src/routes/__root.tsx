import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { SiteHeader } from "../components/root/Header";
import SiteFooter from "../components/root/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col justify-between">
        <div>
          <SiteHeader />
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        <div className="">
          <SiteFooter />
        </div>
      </div>
    </QueryClientProvider>
  ),
});
