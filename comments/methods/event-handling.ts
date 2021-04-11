import { commentsByPostId } from "../data/comments-by-post-id";

export const handleEvent = (eventType: string, eventData: any) => {
  switch (eventType) {
    case "PostCreated": {
      if (!commentsByPostId[eventData.id]) {
        commentsByPostId[eventData.id] = []
      }
      break;
    }
    default: {
      break
    }
  }

  return;
}