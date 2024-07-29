import { makeAutoObservable, runInAction } from "mobx";
import { Todo } from "../model/todosTypes";
import { todosApi } from "../api/todosApi";
import { getRandomInt } from "../utils";

export default class TodoStore {
  todos: Todo[] = [];
  isLoading = false;
  loadingId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get userIds() {
    return [...new Set(this.todos.map(({ userId }) => userId))].sort(
      (a, b) => b - a
    );
  }

  setTodos = (todos: Todo[] | [] = []) => {
    this.todos = todos;
  };

  loadTodos = async () => {
    this.isLoading = true;
    try {
      const result = await todosApi.getTodos();
      runInAction(() => {
        if (result) this.todos = result;
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  setLoadingInitial(value: boolean) {
    this.isLoading = value;
  }

  addTodo = async (todoText: string) => {
    const todo: Omit<Todo, "id"> = {
      userId: getRandomInt(this.userIds[0]),
      todo: todoText,
      completed: false,
    };

    try {
      const newTodo = await todosApi.createTodo(todo);
      runInAction(() => {
        if (newTodo) {
          this.todos.push(newTodo);
        }
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
        let index = this.todos.findIndex((item) => item.id === todo.id);
        this.todos[index] = todo;
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
        this.setTodos(this.todos.filter((todo) => todo.id !== id));
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      this.loadingId = null;
    }
  };
}
