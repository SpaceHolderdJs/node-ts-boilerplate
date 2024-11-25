import http, { IncomingMessage, ServerResponse } from "http";

import Get from "./src/Responses/get";
import Post from "./src/Responses/post";
import Put from "./src/Responses/put";
import Patch from "./src/Responses/patch";
import Delete from "./src/Responses/delete";

const methodHandlers: Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => void
> = {
  GET: (req, res) => Get(req, res),
  POST: (req, res) => Post(req, res),
  PUT: (req, res) => Put(req, res),
  PATCH: (req, res) => Patch(req, res),
  DELETE: (req, res) => Delete(req, res),
};

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { method } = req;

    if (method && methodHandlers[method]) {
      methodHandlers[method](req, res);
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed" }));
    }
  }
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
