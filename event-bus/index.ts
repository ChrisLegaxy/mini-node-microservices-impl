import express, { Request, Response } from "express";
import axios from "axios";

const POST_BASE_URL = "http://localhost:4000";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const events: any[] = [];

server.post("/events", (request: Request, response: Response) => {
  const event = request.body;

  events.push(event);

  axios.post(`${POST_BASE_URL}/events`, event);

  return response.json({
    message: "OKAY",
  });
});

server.get("/events", (request: Request, response: Response) => {
  return response.json(events);
})

server.listen(5000, () => {
  console.log("Server is listing on PORT 5000");
});
