import { queryClient } from "../../shared/api/query-client";
import { store } from "../../shared/redux";
import { authApi } from "../auth/api";
import { authSlice } from "../auth/auth.slice";
import { prefetchAuth } from "../auth/prefetch";
import { todoApi } from "./api";

export const prefetchTodoList = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    prefetchAuth();
    queryClient.prefetchQuery(
      todoApi.getTodoListQueryOptions({ userId: userId })
    );
    queryClient.prefetchQuery(
      todoApi.getTodoListQueryOptions({ userId: "2" })
    );
    queryClient.prefetchQuery(
      todoApi.getTodoListQueryOptions({ userId: "3" })
    );
  }
};