import { BaseResponse } from "./baseTypes";

export interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse extends BaseResponse {
  todos: Todo[];
}
