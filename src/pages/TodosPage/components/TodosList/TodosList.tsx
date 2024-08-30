import React from "react";
import { Checkbox } from "@mui/material";

import { useStore } from "@store";
import Controls from "@core/Controls";

import s from "./TodosList.module.scss";

interface TodosListProps {
  onEdit: (id: number) => void;
}

const TodosList = ({ onEdit }: TodosListProps) => {
  const { todosStore } = useStore();
  const { editTodo, todos, loadingId, deleteTodo } = todosStore;

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className={s.TodosList__listItem}>
          <div>
            <Checkbox
              checked={todo.completed}
              onChange={() => editTodo({ ...todo, completed: !todo.completed })}
            />
            <span className={todo.completed ? s.TodosList__completedTodo : ""}>
              {todo.todo}
            </span>
          </div>
          <Controls
            isDisabled={loadingId === todo.id}
            onEdit={() => onEdit(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TodosList;
