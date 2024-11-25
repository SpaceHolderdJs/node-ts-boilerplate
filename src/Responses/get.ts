import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

import { User } from "../types/User";
import { sendJsonResponse, parseParams } from "../utilites";

const Get = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const User: Partial<User> = parseParams(req.url || "");

    if (User.id === 0) {
      const directory = `./files/users/`;
      const fileNames = fs.readdirSync(`./files/users/`);
      const result: User[] = [];
      fileNames.forEach((elem) => {
        result.push(
          JSON.parse(fs.readFileSync(`${directory}${elem}`).toString())
        );
      });
      sendJsonResponse(res, result);
      res.statusCode = 200;
      return res.end();
    }

    const directory = `./files/users/${User.id}.json`;
    if (fs.existsSync(directory)) {
      sendJsonResponse(res, JSON.parse(fs.readFileSync(directory).toString()));
      res.statusCode = 200;
      return res.end();
    } else {
      res.statusCode = 404;
      return res.end("User not found");
    }

    res.end();
  } catch (err) {
    console.error(err);
    res.end(`Error: ${err}`);
  }
};

export default Get;
