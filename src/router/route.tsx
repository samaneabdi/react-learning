import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Home = React.lazy(() => import("../pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
