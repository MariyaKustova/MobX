import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Checkbox } from "@mui/material";

import { Loader } from "../../core/Loader";
import { TodoDialog } from "./components/TodoDialog";
import Controls from "../../core/Controls";

import s from "./TodosPage.module.scss";
import PageTitle from "../../core/PageTitle";

const TodosPage = observer(() => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { todosStore } = useStore();
  const {
    loadTodos,
    addTodo,
    editTodo,
    deleteTodo,
    todos,
    isLoading,
    loadingId,
  } = todosStore;

  const currentTodo = todos.find((todo) => todo.id === editTodoId);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const onCloseEditDialog = () => setEditTodoId(null);
  const onCloseCreateDialog = () => setOpenDialog(false);

  return (
    <>
      <PageTitle title="Todos" onClick={() => setOpenDialog(true)} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {todos.map((todo) => (
            <div key={todo.id} className={s.TodosPage__listItem}>
              <div className={s.TodosPage__wrapper}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() =>
                    editTodo({ ...todo, completed: !todo.completed })
                  }
                />
                <span
                  className={todo.completed ? s.TodosPage__completedTodo : ""}
                >
                  {todo.todo}
                </span>
              </div>
              <Controls
                isDisabled={loadingId === todo.id}
                onEdit={() => setEditTodoId(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </div>
          ))}
          {Boolean(editTodoId) && (
            <TodoDialog
              open={Boolean(editTodoId)}
              onClose={onCloseEditDialog}
              value={currentTodo?.todo}
              onChange={(value: string) => {
                if (currentTodo && value.length && currentTodo.todo !== value) {
                  editTodo({ ...currentTodo, todo: value });
                }
                onCloseEditDialog();
              }}
              isEdit
            />
          )}
          {openDialog && (
            <TodoDialog
              open={openDialog}
              onClose={onCloseCreateDialog}
              onChange={(value: string) => {
                if (value.length) {
                  addTodo(value);
                }
                onCloseCreateDialog();
              }}
            />
          )}
        </>
      )}
    </>
  );
});

export default TodosPage;
