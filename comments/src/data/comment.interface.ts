export interface Comment {
  id: string;
  content: string;
  status: string;
}

export interface CommentsByPostId {
  [id: string]: Comment[];
}
