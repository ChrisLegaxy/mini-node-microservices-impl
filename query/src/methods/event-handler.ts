import { posts } from "../data/posts";

export const handleEvent = (eventType: string, eventData: any) => {
  switch (eventType) {
    case "PostCreated": {
      const { id, title } = eventData;

      if (!posts[id]) {
        posts[id] = {
          id,
          title,
          comments: [],
        };
      }

      break;
    }
    case "CommentCreated": {
      const { postId, id, content, status } = eventData;

      if (posts[postId]) {
        posts[postId].comments.push({
          id,
          content,
          status,
        });
      }

      break;
    }
    case "CommentUpdated": {
      const { postId, id, status } = eventData;

      if (posts[postId]) {
        const comments = posts[postId].comments;

        const comment = comments.find((comment) => comment.id === id);

        if (comment) {
          comment.status = status;
        }
      }

      break;
    }
    default: {
      break;
    }
  }
};
