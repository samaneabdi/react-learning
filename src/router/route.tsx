import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const Cats = React.lazy(() => import("../pages/cat/Cats"));
const Todos = React.lazy(() => import("../pages/todo/Todos"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Cats",
        element: <Cats />,
      },
      {
        path: "/Todos",
        element: <Todos />,
      },
    ],
  },
]);

export default router;
