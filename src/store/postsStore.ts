import { makeAutoObservable, runInAction } from "mobx";

import { FormValues, Post, Tag } from "@model/postsTypes";
import { postsApi } from "@api/postsApi";
import { getRandomInt } from "../utils";

export default class PostsStore {
  post: Post | null = null;
  posts: Post[] = [];
  tagsList: Tag[] = [];
  userIds: number[] = [];
  loadingInitial = false;
  loadingId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const result = await postsApi.getPosts();

      runInAction(() => {
        if (result?.length) this.posts = result;
        this.userIds = [...new Set(result?.map(({ userId }) => userId))] ?? [];
        this.loadingInitial = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadPostById = async (id: string) => {
    this.loadingId = id;
    try {
      const result = await postsApi.getPostById(id);

      runInAction(() => {
        if (result) this.post = result;
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loadingId = null;
      });
    }
  };

  addPost = async ({ title, body, tags }: FormValues) => {
    const userId = this.userIds[getRandomInt(this.userIds.length - 1)];

    try {
      const response = await postsApi.createPost({
        title,
        userId,
      });

      runInAction(() => {
        if (response) {
          const newPost: Post = {
            id: response.id,
            title,
            body,
            tags,
            reactions: {
              likes: 0,
              dislikes: 0,
            },
            views: 0,
            userId: response.id,
          };

          this.posts = [...this.posts, newPost];
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  editPost = async (post: Post) => {
    this.loadingId = String(post.id);
    try {
      await postsApi.editPost({ id: post.id, title: post.title });
      runInAction(() => {
        let index = this.posts.findIndex((item) => item.id === post.id);
        this.posts = this.posts.map((postItem, postItemIndex) => {
          if (postItemIndex === index) return post;
          return postItem;
        });
        this.post = post;
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      this.loadingId = null;
    }
  };

  deletePost = async (id: number) => {
    this.loadingId = String(id);
    try {
      await postsApi.deletePost(id);
      runInAction(() => {
        this.posts = this.posts.filter((todo) => todo.id !== id);
        this.loadingId = null;
      });
    } catch (err) {
      console.log(err);
      this.loadingId = null;
    }
  };
  loadTagsList = async () => {
    try {
      const response = await postsApi.getTagsList();
      runInAction(() => {
        if (response) {
          this.tagsList = response;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}
