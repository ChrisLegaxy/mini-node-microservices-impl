/**
 * * Imports
 */
import express, { Request, Response } from "express";
import axios from "axios";

/**
 * * Constants
 */
const POSTS_BASE_URL = "http://localhost:4000/";
const COMMENTS_BASE_URL = "http://localhost:5000";

/**
 * * Data
 */
import { events } from "./data/events";

/**
 * * Initialize server
 */
const server = express();

/**
 * * Middlewares
 */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/**
 * * Routes & Controllers
 */
server.post("/events", (request: Request, response: Response) => {
  const event = request.body;

  events.push(event);

  axios.post(`${POSTS_BASE_URL}/events`, event);
  axios.post(`${COMMENTS_BASE_URL}/events`, event);

  return response.json({
    message: "OKAY",
  });
});

server.get("/events", (request: Request, response: Response) => {
  return response.json(events);
});

server.listen(5000, () => {
  console.log("Server is listing on PORT 5000");
});
