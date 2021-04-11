/**
 * * Imports
 */
import express, { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

/**
 * * Data
 */
import { posts } from "./data/posts";

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
server.get("/posts", (request: Request, response: Response) => {
  return response.json(posts);
});

server.post("/posts", async (request: Request, response: Response) => {
  const id = uuidv4();
  const { title } = request.body;

  posts[id] = {
    id,
    title,
  };

  /* emit 'PostCreated' event */
  try {
    await axios.post(EVENT_BUS_URL, {
      type: "PostCreated",
      data: posts[id],
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong",
    });
  }

  return response.json(posts[id]);
});

/**
 * * Recieving Events
 */
server.post("/events", (request: Request, resposne: Response) => {
  const { type: eventType, data: eventData } = request.body;

  console.log("=============================================");
  console.log("Event recieved:", eventType);
  console.log("Data:", eventData);
  console.log("=============================================");

  return resposne.end();
});

server.listen(4000, () => {
  console.log("Server is running on PORT 4000");
});
