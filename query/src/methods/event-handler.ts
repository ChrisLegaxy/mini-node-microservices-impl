import { posts } from "../data/posts";

export const handleEvent = (eventType: string, eventData: any) => {
  switch (eventType) {
    case "PostCreated": {
      const { id, title } = eventData;

      if (!posts[id]) {
        posts[id] = {
          id,
          title,
          comments: []
        }
      }

      break;
    }
    case "CommentCreated": {
      const { postId, id, content } = eventData;

      if (posts[postId]) {
        posts[postId].comments.push({
          id,
          content
        })
      }

      break;
    }
    default: {
      break;
    }
  }
};
