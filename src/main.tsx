import React from "react";
import ReactDOM from "react-dom/client";
import {
  RootRoute,
  Outlet,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/router";
import "./globals.css";
import { Home } from "./pages/Home";
import { Cat } from "./pages/Cat";

const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

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

const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
