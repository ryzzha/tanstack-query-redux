import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "./api";
import { useSuspenceUser } from "../auth/use-user";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const user = useSuspenceUser();

  const deleteTodoMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoApi.baseKey]
      });
    },
    async onSuccess(_, deletedId) {
      queryClient.setQueryData(
        todoApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
        todos => todos?.filter(item => item.id !== deletedId)
      );
    }
  });
  deleteTodoMutation.variables;
  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id
  };
}