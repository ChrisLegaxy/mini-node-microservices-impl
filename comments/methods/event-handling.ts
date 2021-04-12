import axios from "axios";
import { commentsByPostId } from "../data/comments-by-post-id";

export const handleEvent = async (
  eventType: string,
  eventData: any,
  EVENT_BUS_URL: string
) => {
  switch (eventType) {
    case "PostCreated": {
      const post = eventData;

      if (!commentsByPostId[post.id]) {
        commentsByPostId[post.id] = [];
      }

      break;
    }
    case "CommentModerated": {
      /**
       * * comment
       */
      const { postId, id, status } = eventData;

      if (commentsByPostId[postId]) {
        const comments = commentsByPostId[postId];

        // comment to be updated after moderation
        const comment = comments.find((comment) => comment.id === id);

        if (comment) {
          comment.status = status;
        }

        await axios.post(EVENT_BUS_URL, {
          type: "CommentUpdated",
          data: {
            postId,
            ...comment,
          },
        });
      }

      break;
    }
    default: {
      break;
    }
  }

  return;
};
