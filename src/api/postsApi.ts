import qs from "qs";
import { Post, PostsResponse, Tag } from "../model/postsTypes";
import { HttpClientBaseQuery } from "./HttpClient";

export const postsApi = {
  getPosts: () =>
    HttpClientBaseQuery<PostsResponse>({ url: "/posts" }).then(
      (response) => response.data?.posts
    ),
  getPostById: (id: string) =>
    HttpClientBaseQuery<Post>({ url: `/posts/${id}` }).then(
      (response) => response.data
    ),
  searchPost: (value: string) => {
    const queryParams = qs.stringify({
      q: value,
    });
    return HttpClientBaseQuery<PostsResponse>({
      url: `/posts/search?${queryParams}`,
    }).then((response) => response.data?.posts);
  },
  createPost: (post: Pick<Post, "userId" | "title">) =>
    HttpClientBaseQuery<Post>({
      url: "/posts/add",
      method: "post",
      data: post,
    }).then((response) => response.data),
  editPost: (post: Pick<Post, "id" | "title">) =>
    HttpClientBaseQuery<Post>({
      url: `/posts/${post.id}`,
      method: "put",
      data: { title: post.title },
    }),
  deletePost: (id: number) =>
    HttpClientBaseQuery<Post>({ url: `/posts/${id}`, method: "delete" }),
  getTagsList: () =>
    HttpClientBaseQuery<Tag[]>({ url: `/posts/tags` }).then(
      (response) => response.data
    ),
};
