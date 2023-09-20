import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";

export const todoApi = createApi({
    reducerPath:"todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://api.todoist.com/rest/v2/tasks",
        prepareHeaders: (headers) =>{
            headers.set(
                "Authorization",apiKey,
                "X-Request-Id", uuidv4(),
                "Content-Type", "application/json")}
        }),
    endpoints:(builder) =>({
        getTodo: builder.query({
            query: () => ({url:"/"}),
            providesTags: ["todoApi"]
        }),
        createTodo: builder.mutation({
            query: (newTaskData) => ({
                url:"/",
                method: "POST",
                body: newTaskData
            }),
            invalidatesTags: ["todoApi"]
        }),
        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url:`/${id}`,
                method:"DELETE",
                // body: {id}
            }),
            invalidatesTags: ["todoApi"]
        })
    })
    
})

export const {useGetTodoQuery, useCreateTodoMutation, useDeleteTodoMutation} = todoApi;