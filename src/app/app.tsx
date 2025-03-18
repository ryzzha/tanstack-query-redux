import { Login } from "../modules/auth/login";
import { LogoutButton } from "../modules/auth/logout-button";
import { useUser } from "../modules/auth/use-user";
import { prefetchTodoList } from "../modules/todo/prefetch-todo-list";
import { TodoList } from "../modules/todo/todo-list";

export function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading</div>;
  }

  if (user.data) {
    prefetchTodoList();

    return (
      <>
        <LogoutButton /> <TodoList />
      </>
    );
  }

  return <Login />;
}