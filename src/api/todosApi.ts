import { Todo } from "@model/todosTypes";
import { HttpClientBaseQuery } from "./HttpClient";

const BASE_URL = "/todos";

export const todosApi = {
  getTodos: () =>
    HttpClientBaseQuery<Todo[]>({ url: BASE_URL }).then(
      (response) => response.data
    ),
  getTodoById: (id: number) =>
    HttpClientBaseQuery<Todo>({ url: `${BASE_URL}/${id}` }),
  createTodo: (todo: Omit<Todo, "id">) =>
    HttpClientBaseQuery<Todo>({
      url: BASE_URL,
      method: "POST",
      data: todo,
    }).then((response) => response.data),
  editTodo: (todo: Todo) =>
    HttpClientBaseQuery<Todo>({
      url: `${BASE_URL}/${todo.id}`,
      method: "PUT",
      data: todo,
    }),
  deleteTodo: (id: number) =>
    HttpClientBaseQuery<Todo>({ url: `${BASE_URL}/${id}`, method: "DELETE" }),
};
