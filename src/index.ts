import { createServer } from "node:http";
import { getUsers } from "./utils/getUsers";
import { getUserById } from "./utils/getUserById";
import { sendResponse } from "./utils/sendJsonResponse";
import { createUser } from "./utils/createUser";
import { parseRequestBody } from "./utils/parseRequestBody";
import { sendError } from "./utils/sendError";
import { updateUser } from "./utils/updateUser";
import { validateUser } from "./utils/validateUser";
import { deleteUserById } from "./utils/deleteUserById";

const server = createServer(async (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      if (url === "/users") {
        const users = await getUsers();
        sendResponse(res, JSON.stringify(users));
      } else if (url?.startsWith("/users/")) {
        const userId = Number(url.split("/").pop());
        const user = await getUserById(userId);
        sendResponse(res, JSON.stringify(user));
      }
      break;

    case "POST":
      if (url === "/users") {
        const user = await parseRequestBody(req);
        const validatedUser = validateUser(JSON.parse(user), "create");

        if (validatedUser) {
          await createUser(validatedUser);
          sendResponse(res, "User created successfully");
        } else {
          sendError(res, "Invalid user data");
        }
      }
      break;

    case "PATCH":
      if (url === "/users") {
        const user = await parseRequestBody(req);
        const validatedUser = validateUser(JSON.parse(user), "update");

        if (validatedUser) {
          await updateUser(validatedUser);
          sendResponse(res, "User updated successfully");
        } else {
          sendError(res, "Invalid user data");
        }
      }
      break;

    case "DELETE":
      if (url?.startsWith("/users/")) {
        const userId = Number(url.split("/").pop());
        await deleteUserById(userId);
        sendResponse(res, "User deleted successfully");
      }
      break;

    default:
      sendError(res, "Endpoint not found");
      break;
  }
});

const PORT = 8000;

server.listen(PORT);
