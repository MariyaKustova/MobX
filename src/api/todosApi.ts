import { Todo, TodosResponse } from "../model/todosTypes";
import { HttpClientBaseQuery } from "./HttpClient";

export const todosApi = {
  getTodos: () =>
    HttpClientBaseQuery<TodosResponse>({ url: "/todos" }).then(
      (response) => response.data?.todos
    ),
  getTodoById: (id: number) =>
    HttpClientBaseQuery<Todo>({ url: `/todos/${id}` }),
  createTodo: (todo: Omit<Todo, "id">) =>
    HttpClientBaseQuery<Todo>({
      url: "/todos/add",
      method: "POST",
      data: todo,
    }).then((response) => response.data),
  editTodo: (todo: Todo) =>
    HttpClientBaseQuery<Todo>({
      url: `/todos/${todo.id}`,
      method: "PUT",
      data: { completed: todo.completed },
    }),
  deleteTodo: (id: number) =>
    HttpClientBaseQuery<Todo>({ url: `/todos/${id}`, method: "DELETE" }),
};
