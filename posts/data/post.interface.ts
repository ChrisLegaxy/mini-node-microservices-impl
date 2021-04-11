export interface Post {
  id: string;

  title: string;
}

export interface PostCollection {
  [id: string]: Post;
}
