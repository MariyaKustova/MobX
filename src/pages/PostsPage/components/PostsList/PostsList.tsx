import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStore } from "@store";
import { RoutePath } from "@model/baseTypes";
import PostItem from "../PostItem";

import s from "./PostsList.module.scss";

const PostsList = observer(function PostsList() {
  const { postsStore } = useStore();
  const { posts, loadPosts } = postsStore;

  useEffect(() => {
    if (!posts.length) {
      loadPosts();
    }
  }, [loadPosts, posts]);

  return (
    <div className={s.PostsList}>
      {posts.map(({ id, title, tags, body }) => (
        <Link
          key={id}
          className={s.PostsList__link}
          to={RoutePath.POST_ITEM.replace(":id", String(id))}
        >
          <PostItem title={title} tags={tags} body={body} />
        </Link>
      ))}
    </div>
  );
});

export default PostsList;
