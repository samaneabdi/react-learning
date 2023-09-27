import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductBasket from "../pages/product/ProductBasket";

const Products = React.lazy(() => import("../pages/product/Products"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
