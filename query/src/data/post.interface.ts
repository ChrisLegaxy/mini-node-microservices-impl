export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  status: string;
}

export interface PostsWithCommentsCollection {
  [id: string]: Post;
}
