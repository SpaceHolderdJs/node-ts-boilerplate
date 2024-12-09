import { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse, message: string) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(message);
};
