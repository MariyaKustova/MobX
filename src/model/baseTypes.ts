export interface BaseResponse {
  total: number;
  skip: number;
  limit: number;
}

export enum RoutePath {
  MAIN = "/",
  POSTS = "/posts",
  POST_ITEM = "/posts/:id",
  TODOS = "/todos",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
