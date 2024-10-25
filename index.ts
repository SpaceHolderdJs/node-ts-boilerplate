import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs/promises";
import { UserDTOType, isUserDTOType } from "./src/dto/user.dto";
import url from "url";
const path = require("path");

const USER_DB_URL = "./src/files/storage/users.json";
// Handle empty file
(async () => {
  try {
    const dir = path.dirname(USER_DB_URL);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      USER_DB_URL,
      JSON.stringify([
        {
          id: "Init",
          name: "Init",
          age: 0,
          email: "Init",
          skills: ["Init"],
          city: "Init",
        },
      ]),
      { flag: "wx" }
    );
  } catch (ignore) {}
})();

const readJSONFile = async (): Promise<UserDTOType[]> => {
  const allUsersData = await fs.readFile(USER_DB_URL, "utf-8");
  const allUsers: UserDTOType[] = JSON.parse(allUsersData);
  return allUsers;
};

const writeJSONFile = async (data: UserDTOType[]) => {
  await fs.writeFile(USER_DB_URL, JSON.stringify(data));
};

const sendJsonResponse = (
  res: ServerResponse,
  message: any,
  statusCode: number
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(message));
};

const getBody = (chunk: string) => {
  return JSON.parse(chunk);
};

const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const allUsers = await readJSONFile();
  const parsedUrl = url.parse(req.url || "", true);
  const query = parsedUrl.query;
  const id = Array.isArray(query.id) ? query.id[0] : query.id;
  if (id) {
    const user = allUsers.find((user) => user.id === id);

    if (!user) {
      return sendJsonResponse(res, { message: "User not found" }, 404);
    }
    sendJsonResponse(res, user, 200);
  } else {
    sendJsonResponse(res, allUsers, 200);
  }
};

const postUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const body = req.data;

  if (!isUserDTOType(body)) {
    return sendJsonResponse(res, { message: "User data is not valid" }, 400);
  }

  const allUsers = await readJSONFile();

  const uuid = crypto.randomUUID();
  body.id = uuid;

  allUsers.push(body);
  await writeJSONFile(allUsers);
  sendJsonResponse(res, { message: "User is added" }, 201);
};

const patchUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const body = req.data;
  const parsedUrl = url.parse(req.url || "", true);
  const query = parsedUrl.query;
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  if (!id) {
    return sendJsonResponse(res, { message: "User ID is required" }, 400);
  }

  const allUsers = await readJSONFile();
  const userIndex = allUsers.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return sendJsonResponse(res, { message: "User not found" }, 404);
  }

  const updatedUser = { ...allUsers[userIndex], ...body };
  allUsers[userIndex] = updatedUser;

  await writeJSONFile(allUsers);
  sendJsonResponse(res, { message: "User updated", user: updatedUser }, 200);
};

const deleteUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = url.parse(req.url || "", true);
  const query = parsedUrl.query;
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  if (!id) {
    return sendJsonResponse(res, { message: "User ID is required" }, 400);
  }

  const allUsers = await readJSONFile();
  const newUsersList = allUsers.filter((user) => user.id !== id);

  if (newUsersList.length === allUsers.length) {
    return sendJsonResponse(res, { message: "User not found" }, 404);
  }

  await writeJSONFile(newUsersList);
  sendJsonResponse(res, { message: "User deleted" }, 200);
};

// Object to map HTTP methods to response messages
const methodHandlers: Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => void
> = {
  GET: (req, res) => getUsers(req, res),
  POST: (req, res) => postUsers(req, res),
  // PUT: (req, res) => getUsers(req, res),
  PATCH: (req, res) => patchUsers(req, res),
  DELETE: (req, res) => deleteUsers(req, res),
};

// Create the server
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    req.on("data", (chunk) => {
      req.data = getBody(chunk);
    });
    req.on("end", () => {
      const { method } = req;
      // Check if the method exists in the handlers object
      if (method && methodHandlers[method]) {
        methodHandlers[method](req, res);
      } else {
        // Respond with 405 Method Not Allowed if the method is not supported
        // You can read more about response statuses here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        sendJsonResponse(res, { message: "Method not allowed" }, 405);
      }
    });
  }
);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
