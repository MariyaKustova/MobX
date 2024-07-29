import { makeAutoObservable, runInAction } from "mobx";
import { FormValues, Post, Tag } from "../model/postsTypes";
import { postsApi } from "../api/postsApi";
import { getRandomInt } from "../utils";

export default class PostsStore {
  _post: Post | null = null;
  _posts: Post[] = [];
  _tagsList: Tag[] = [];
  loadingInitial = false;
  loadingId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get posts() {
    return this._posts;
  }

  get post() {
    return this._post;
  }

  get tagsList() {
    return this._tagsList;
  }

  setPosts = (posts: Post[] | [] = []) => {
    this._posts = posts;
  };

  setPost = (post: Post | null) => {
    this._post = post;
  };

  setTags = (tags: Tag[]) => {
    this._tagsList = tags;
  };

  get userIds() {
    return [...new Set(this.posts.map(({ userId }) => userId))].sort(
      (a, b) => b - a
    );
  }

  loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const result = await postsApi.getPosts();

      runInAction(() => {
        if (result?.length) this.setPosts(result);
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
        if (result) this.setPost(result);
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
    try {
      const response = await postsApi.createPost({
        title,
        userId: getRandomInt(this.userIds[0]),
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
            userId: getRandomInt(this.userIds[0]),
          };

          const newPosts = this.posts.filter(({ id }) => id !== newPost.id);

          this.setPosts([...newPosts, newPost]);
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
        this.setPosts(
          this.posts.map((postItem, postItemIndex) => {
            if (postItemIndex === index) return post;
            return postItem;
          })
        );
        this.setPost(post);
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
        this.setPosts(this.posts.filter((todo) => todo.id !== id));
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
          this.setTags(response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
}
