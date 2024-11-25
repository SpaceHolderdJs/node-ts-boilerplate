import { IncomingMessage, ServerResponse } from "http";
import fs from "node:fs";

import { User } from "../types/User";
import { parseParams } from "../utilites";

const Post = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const User: Partial<User> = parseParams(req.url || "");

    if (User.id === 0) {
      res.statusCode = 400;
      res.write("Id is invalid");
      return res.end();
    }

    const directory = `./files/users/${User.id}.json`;

    if (!fs.existsSync(directory)) {
      fs.writeFileSync(directory, JSON.stringify(User));
      res.statusCode = 201;
      res.write("User is created");
      return res.end();
    } else {
      res.statusCode = 409;
      res.write("User is already exist");
      return res.end();
    }
  } catch (err) {
    console.error(err);
    res.end(`Error: ${err}`);
  }
};

export default Post;
