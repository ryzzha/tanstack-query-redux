import { queryClient } from "../../shared/api/query-client";
import { store } from "../../shared/redux";
import { authApi } from "./api";
import { authSlice } from "./auth.slice";

export const prefetchAuth = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    queryClient.prefetchQuery(authApi.getUserById(userId));
  }
};