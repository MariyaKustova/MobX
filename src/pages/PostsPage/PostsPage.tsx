import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { Typography } from "@mui/material";

import { useStore } from "../../store";
import PostItemPage from "./components/PostCard";
import { Loader } from "../../core/Loader";
import PageTitle from "../../core/PageTitle";
import PostCreateForm from "./components/PostCreateForm";
import PostsList from "./components/PostsList";

const PostsPageComponent = observer(() => {
  const { postsStore } = useStore();
  const { loadingInitial } = postsStore;
  const [openCreateForm, setOpenCreateForm] = useState(false);

  return (
    <>
      <PageTitle title="Posts" onClick={() => setOpenCreateForm(true)} />
      {loadingInitial ? <Loader /> : <PostsList />}
      {openCreateForm && (
        <PostCreateForm
          open={openCreateForm}
          onClose={() => setOpenCreateForm(false)}
        />
      )}
    </>
  );
});

const PostsPage = () => {
  return (
    <Routes>
      <Route path={"/"} element={<PostsPageComponent />} />
      <Route path={"/:id"} element={<PostItemPage />} />
      <Route
        path="*"
        element={
          <Typography variant="h4" component="div" color={"primary"}>
            Ресурс не найден
          </Typography>
        }
      />
    </Routes>
  );
};

export default PostsPage;
