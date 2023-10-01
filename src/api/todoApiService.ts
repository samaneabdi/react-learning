import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../types/todoType";

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";

export const todoApi = createApi({
    reducerPath:"todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://api.todoist.com/rest/v2/tasks",
        prepareHeaders: (headers) => {
            headers.set("Authorization", apiKey);
            headers.set("X-Request-Id", uuidv4());
            headers.set("Content-Type", "application/json");
          },
        }),
    tagTypes: ['todo'],
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 10 * 60 * 1000, 
    endpoints:(builder) =>({
        getTodo: builder.query<Todo[], string>({
            query: () => ({url:"/"}),
            providesTags: ["todo"]
        }),
        createTodo: builder.mutation({
            query: (newTaskData : Todo) => ({
                url:"/",
                method: "POST",
                body: newTaskData
            }),
            async onQueryStarted(newTaskData , { dispatch, queryFulfilled }) {

                const patchResult = dispatch(
                    todoApi.util.updateQueryData('getTodo', '', (draft) => {
                        draft.push(newTaskData)
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
            },
            invalidatesTags: ["todo"]
        }),
        deleteTodo: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url:`/${id}`,
                method:"DELETE",
            }),
            async onQueryStarted({id} , { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData('getTodo', '', (draft) => {
                        const index = draft.findIndex((item) => item.id === id);
                        if (index !== -1) {
                          draft.splice(index, 1);
                        }
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
            },
            invalidatesTags: ["todo"]
        })
    })
    
})

export const {useGetTodoQuery, useCreateTodoMutation, useDeleteTodoMutation} = todoApi;