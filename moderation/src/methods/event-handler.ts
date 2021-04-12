import axios from "axios";

const EVENT_BUS_URL = "http://localhost:9000/events";

export const handleEvent = async (eventType: string, eventData: any) => {
  switch (eventType) {
    case "CommentCreated": {
      const comment = eventData;

      comment.status = String(comment.content).includes("orange")
        ? "rejected"
        : "approved";

      /**
       * * Emit 'CommentModerated'
       */
      await axios.post(EVENT_BUS_URL, {
        type: "CommentModerated",
        data: comment,
      });

      break;
    }
    default: {
      break;
    }
  }
};
