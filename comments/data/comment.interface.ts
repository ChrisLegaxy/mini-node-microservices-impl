export interface Comment {
  id: string;
  content: string;
}

export interface CommentsByPostId {
  [id: string]: Comment[]
}
