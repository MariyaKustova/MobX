import { createContext, useContext } from "react";
import TodosStore from "./todosStore";
import PostsStore from "./postsStore";

interface Store {
  todosStore: TodosStore;
  postsStore: PostsStore;
}

export const store: Store = {
  todosStore: new TodosStore(),
  postsStore: new PostsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
