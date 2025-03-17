
const BASE_URL = "http://localhost:3000";

export interface PaginatedResult<T> {
    data: T[];
    first: number;
    items: number;
    last: number;
    next: number | null;
    pages: number;
    prev: number | null;
}

export interface TaskDto {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    dueDate?: Date;
}

export const TodoApi = {
    getTodos: async ({ page }: { page: number }) => {
        // await new Promise(resolve => setTimeout(resolve, 2000)); 
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`).then(response => response.json() as Promise<PaginatedResult<TaskDto>>)
    }
}
