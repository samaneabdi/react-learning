import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import Loading from "./components/Loading";
import { QueryClientProvider } from "react-query";
import queryClient from "./api/query-client";
import { ReactQueryDevtools } from "react-query/devtools";
import { ProductStoreProvider } from "./store/productStore";
import { CatStoreProvider } from "./store/catStore";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Suspense fallback={<Loading />}>
    <ProductStoreProvider>
      <CatStoreProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </CatStoreProvider>
    </ProductStoreProvider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
