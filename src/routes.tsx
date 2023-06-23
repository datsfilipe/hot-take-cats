import { Route, Router } from "@tanstack/router";

import { rootRoute } from "./_root";
import { Home } from "./pages/Home";
import { Cat } from "./pages/Cat";

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const catRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/cat",
  component: Cat,
});

const routeTree = rootRoute.addChildren([indexRoute, catRoute]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
