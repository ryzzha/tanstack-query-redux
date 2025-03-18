import { useSuspenseQuery } from "@tanstack/react-query";
import { todoApi } from "./api";
import { useSuspenceUser } from "../auth/use-user";

export function useTodoList() {
  const user = useSuspenceUser();
  const { data: todoItems, refetch } = useSuspenseQuery({
    ...todoApi.getTodoListQueryOptions({ userId: user.data.id }),
    select: data => [...data].reverse()
  });

  return { todoItems, refetch };
}