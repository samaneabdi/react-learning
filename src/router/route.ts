import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductBasket from "../pages/product/ProductBasket";

const Cats = React.lazy(() => import("../pages/cat/Cats"));
const Todos = React.lazy(() => import("../pages/todo/Todos"));
const Products = React.lazy(() => import("../pages/product/Products"));

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
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path: "/ProductBasket",
        element: <ProductBasket />,
      },
    ],
  },
]);

export default router;
