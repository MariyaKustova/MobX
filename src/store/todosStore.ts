import { makeAutoObservable, runInAction } from "mobx";

import { Todo } from "@model/todosTypes";
import { todosApi } from "@api/todosApi";
import { getRandomInt } from "../utils";

export default class TodoStore {
  todos: Todo[] = [];
  userIds: number[] = [];
  isLoading = false;
  loadingId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadTodos = async () => {
    this.isLoading = true;
    try {
      const result = await todosApi.getTodos();
      runInAction(() => {
        if (result?.length) {
          this.todos = result;
          this.userIds = [...new Set(result.map(({ userId }) => userId))].sort(
            (a, b) => b - a
          );
        }
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  addTodo = async (todoText: string) => {
    const todo: Omit<Todo, "id"> = {
      userId: this.userIds[getRandomInt(this.userIds.length - 1)],
      todo: todoText,
      completed: false,
    };

    try {
      await todosApi.createTodo(todo);
      runInAction(() => {
        this.loadTodos();
      });
    } catch (err) {
      console.log(err);
    }
  };

  editTodo = async (todo: Todo) => {
    this.loadingId = todo.id;
    try {
      await todosApi.editTodo(todo);
      runInAction(() => {
        this.loadTodos();
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      this.loadingId = null;
    }
  };

  deleteTodo = async (id: number) => {
    this.loadingId = id;
    try {
      await todosApi.deleteTodo(id);
      runInAction(() => {
        this.loadTodos();
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      this.loadingId = null;
    }
  };
}
