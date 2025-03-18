import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { TodoApi } from "./api"
import styles from "./todo-list.module.css";
import { useState } from "react";

function TodoList() {
    const [page, setPage] = useState(1)
    const [enabled, setEnabled] = useState(false)

    const { data: todos, isLoading, status, fetchStatus, isError } = useQuery({
        queryKey: ["tasks", { page }], 
        queryFn: () => TodoApi.getTodos({ page }),
        placeholderData: keepPreviousData,
        enabled
    })

    console.log({ status, fetchStatus })

    if (isLoading) return <p className={styles.loading}>Завантаження...</p>;
    if (isError) return <p className={styles.error}>Помилка завантаження даних!</p>;

    return (
        <div className={styles.container}> 
            <h3 className={styles.title}>Todo List</h3>
            <button onClick={() => setEnabled(e => !e)}>Togggle enabled</button>
            <ul className={styles.list}>
                {todos?.data.map((todo) => (
                    <li key={todo.id} className={styles.task}>
                        <span className={todo.completed ? styles.completed : ""}>
                            {todo.title}
                        </span>
                        <span className={styles.date}>{new Date(todo.createdAt).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button 
                    className={styles.button} 
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Попередня
                </button>
                <span className={styles.page}>Сторінка {page}</span>
                <button 
                    className={styles.button} 
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!todos?.next} 
                >
                    Наступна
                </button>
            </div>
        </div>
    );
}

export default TodoList
