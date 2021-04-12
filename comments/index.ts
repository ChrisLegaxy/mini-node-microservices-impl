/**
 * * Imports
 */
import express, { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

/**
 * * Data
 */
import { commentsByPostId } from "./data/comments-by-post-id";
import { handleEvent } from "./methods/event-handling";

/**
 * * Constants
 */
const EVENT_BUS_URL = "http://localhost:9000/events";

/**
 * * Initiaize server
 */
const server = express();

/**
 * * Middlewares
 */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/**
 * * Routes
 */
server.get("/posts/:id/comments", (request: Request, response: Response) => {
  const postId = request.params.id;

  if (!commentsByPostId[postId]) {
    return response.status(404).json({
      message: "Post not found",
    });
  }

  return response.json(commentsByPostId[request.params.id]);
});

server.post(
  "/posts/:id/comments",
  async (request: Request, response: Response) => {
    const postId = request.params.id;

    if (!commentsByPostId[postId]) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    const id = uuidv4();
    const { content } = request.body;

    const incomingComment = {
      id,
      content,
      status: "pending",
    };

    const comments = commentsByPostId[postId];

    comments.push(incomingComment);

    /* emit 'CommentCreated' event */
    try {
      await axios.post(EVENT_BUS_URL, {
        type: "CommentCreated",
        data: {
          postId,
          ...incomingComment,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: "Something went wrong",
      });
    }

    return response.json(comments);
  }
);

/**
 * * Recieving Events
 */
server.post("/events", (request: Request, resposne: Response) => {
  const { type: eventType, data: eventData } = request.body;

  console.log("=============================================");
  console.log("Event recieved:", eventType);
  console.log("Data:", eventData);
  console.log("=============================================");

  handleEvent(eventType, eventData, EVENT_BUS_URL);

  return resposne.end();
});

server.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});
