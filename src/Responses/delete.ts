import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

import { User } from "../types/User";
import { parseParams } from "../utilites";

const Delete = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const User: Partial<User> = parseParams(req.url || "");

    if (User.id === 0) {
      res.statusCode = 400;
      res.write("Id is invalid");
      return res.end();
    }

    const directory = `./files/users/${User.id}.json`;
    if (fs.existsSync(directory)) {
      fs.unlinkSync(directory);
      res.statusCode = 202;
      return res.end();
    } else {
      res.statusCode = 404;
      return res.end("User not found");
    }
  } catch (err) {
    console.error(err);
    res.end(`Error: ${err}`);
  }
};

export default Delete;
