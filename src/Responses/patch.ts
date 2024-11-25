import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

import { User } from "../types/User";
import { parseParams } from "../utilites";

const Patch = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const User: Partial<User> = parseParams(req.url || "");

    if (User.id === 0) {
      res.statusCode = 400;
      res.write("Id is invalid");
      return res.end();
    }

    const directory = `./files/users/${User.id}.json`;
    if (fs.existsSync(directory)) {
      const savedUser = JSON.parse(fs.readFileSync(directory).toString());
      fs.writeFileSync(directory, JSON.stringify({ ...savedUser, ...User }));
      res.statusCode = 200;
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

export default Patch;
