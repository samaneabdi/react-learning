import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { selectSearch } from "../store/catSlice"; // Import your selector

const apiKey = "sbfHb94ZML5YXYHMl93ejA==wDBJDF3ENKztXz7z";

export const catApi = createApi({
    reducerPath:"catApi",
    baseQuery: fetchBaseQuery(
        { baseUrl: "https://api.api-ninjas.com/v1/cats",
            prepareHeaders:(headers) => {
            headers.set("X-Api-Key",apiKey);
            return headers;
            }
         }),
    endpoints: (builder) => ({
      getCat: builder.query({
        query: (name) => {
        
            if(name){
                return {url:"/",params:{name}}
            }
            return {url:"/", params:{min_weight:1}}
        },
        transformResponse: (response) => response,
      }),
    }),
  });

  export const { useGetCatQuery } = catApi;
 