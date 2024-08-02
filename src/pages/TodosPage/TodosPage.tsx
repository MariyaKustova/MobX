import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../store";
import { Loader } from "../../core/Loader";
import { TodoDialog } from "./components/TodoDialog";
import PageTitle from "../../core/PageTitle";
import TodosList from "./components/TodosList";

const TodosPage = observer(() => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { todosStore } = useStore();
  const { loadTodos, addTodo, editTodo, todos, isLoading } = todosStore;

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const currentTodo = todos.find((todo) => todo.id === editTodoId);

  const onCloseEditDialog = () => setEditTodoId(null);
  const onCloseCreateDialog = () => setOpenDialog(false);

  return (
    <>
      <PageTitle title="Todos" onClick={() => setOpenDialog(true)} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TodosList onEdit={setEditTodoId} />
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
