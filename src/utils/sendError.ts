import { ServerResponse } from "http";

export const sendError = (res: ServerResponse, message: string) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(message);
};
