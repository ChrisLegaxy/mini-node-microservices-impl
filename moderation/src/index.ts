/**
 * * Imports
 */
import express, { Request, response, Response } from "express";
import { handleEvent } from "./methods/event-handler";

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
 * * Recieving Events
 */
server.post("/events", async (request: Request, resposne: Response) => {
  const { type: eventType, data: eventData } = request.body;

  console.log("=============================================");
  console.log("Event recieved:", eventType);
  console.log("Data:", eventData);
  console.log("=============================================");

  await handleEvent(eventType, eventData);

  return resposne.end();
});

server.listen(7000, () => {
  console.log("Server is running on PORT 7000");
});
