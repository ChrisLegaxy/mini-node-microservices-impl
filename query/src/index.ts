/**
 * * Imports
 */
import express, { Request, Response } from "express";
import { handleEvent } from "./methods/event-handler";

/**
 * * Constants
 */
// const EVENT_BUS_URL = "http://localhost:9000/events";

/**
 * * Data
 */
import { posts } from "./data/posts";

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

/**
 * * Recieving Events
 */
server.post("/events", (request: Request, resposne: Response) => {
  const { type: eventType, data: eventData } = request.body;

  console.log("=============================================");
  console.log("Event recieved:", eventType);
  console.log("Data:", eventData);
  console.log("=============================================");

  handleEvent(eventType, eventData);

  return resposne.end();
});

server.listen(6000, () => {
  console.log("Server is running on PORT 6000");
});
