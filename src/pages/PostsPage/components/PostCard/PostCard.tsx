import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useStore } from "../../../../store";
import { Loader } from "../../../../components/Loader";
import Controls from "../../../../components/Controls";
import { PostDialog } from "./components/PostDialog";
import { RoutePath } from "../../../../model/baseTypes";

import s from "./PostCard.module.scss";

const PostCard = observer(() => {
  const { postsStore } = useStore();
  const { post, loadPostById, editPost, deletePost, loadingId } = postsStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [editPostId, setEditPostId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      loadPostById(id);
    }
  }, [id, loadPostById]);

  const onCloseDialog = () => setEditPostId(null);

  return (
    <>
      {Boolean(loadingId) ? (
        <Loader />
      ) : (
        <>
          {post && (
            <>
              <div className={s.PostCard}>
                <IconButton
                  className={s.PostCard__backBtn}
                  onClick={() => navigate(RoutePath.POSTS)}
                >
                  <ArrowBackIosNewRoundedIcon className={s.PostCard__icon} />
                </IconButton>
                <Typography color={"primary"} variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color={"primary"}>
                  {post.tags.map((tag) => "#" + tag).join("")}
                </Typography>
                <Typography variant="body1">{post.body}</Typography>
                <div className={s.PostCard__wrapper}>
                  <Controls
                    onEdit={() => setEditPostId(post.id)}
                    onDelete={() => {
                      deletePost(post.id);
                      navigate(RoutePath.POSTS);
                    }}
                  />
                </div>
              </div>
              {Boolean(editPostId) && (
                <PostDialog
                  open={Boolean(editPostId)}
                  onClose={onCloseDialog}
                  value={post?.title}
                  onChange={(value: string) => {
                    if (value.length && post.title !== value) {
                      editPost({ ...post, title: value });
                    }
                    onCloseDialog();
                  }}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

export default PostCard;
