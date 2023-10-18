import React from "react";
import type { PathRouteProps } from "react-router-dom";

const Home = React.lazy(() => import("~/lib/pages/home"));
const LP = React.lazy(() => import("lib/pages/lp"));
const OrderStatus = React.lazy(() => import("lib/pages/order"));

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lp/:terminalName",
    element: <LP />,
  },
  {
    path: "/order/:orderId",
    element: <OrderStatus />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
