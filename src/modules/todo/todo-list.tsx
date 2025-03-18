import { useTodoList } from "./use-todo-list";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";
import { useSuspenceUser, useUser } from "../auth/use-user";
import { todoApi } from "./api";
import { useSuspenseQuery } from "@tanstack/react-query";
import styles from "./todo-list.module.css"; 

export function TodoList() {
  useSuspenseQuery({
    ...todoApi.getTodoListQueryOptions({ userId: "3" })
  });
  useSuspenseQuery({
    ...todoApi.getTodoListQueryOptions({ userId: "2" })
  });

  const { todoItems } = useTodoList();
  const { data: user } = useSuspenceUser();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Todo List. {user?.login}
      </h1>

      <form className={styles.form} onSubmit={createTodo.handleCreate}>
        <input className={styles.input} type="text" name="text" />
        <button disabled={createTodo.isLoading} className={styles.button}>
          {createTodo.isLoading ? "Створення..." : "Створити"}
        </button>
      </form>

      <div className={styles.todoList}>
        {todoItems?.map(todo => (
          <div className={styles.todoItem} key={todo.id}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id, todo.done)}
            />

            {todo.text}

            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              onClick={() => deleteTodo.handleDelete(todo.id)}
              className={styles.deleteButton}
            >
              {deleteTodo.getIsPending(todo.id) ? "Видалення..." : "Видалити"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}