import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

import { User } from "../types/User";
import { sendJsonResponse, parseParams } from "../utilites";

const Put = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const User: Partial<User> = parseParams(req.url || "");

    if (User.id === 0) {
      res.statusCode = 400;
      res.write("Id is invalid");
      return res.end();
    }

    const directory = `./files/users/${User.id}.json`;
    if (fs.existsSync(directory)) {
      fs.writeFileSync(directory, JSON.stringify(User));
      res.statusCode = 200;
      return sendJsonResponse(res, User);
    } else {
      res.statusCode = 404;
      return res.end("User not found");
    }
  } catch (err) {
    console.error(err);
    res.end(`Error: ${err}`);
  }
};

export default Put;
