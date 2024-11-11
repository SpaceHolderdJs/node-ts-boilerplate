import axios from "axios";

import { mkdir, writeFile, rm } from "node:fs/promises";
import { cwd, stdin } from "node:process";
import { join } from "node:path";

import { pageSkeleton } from "./utils/pageSkeleton";
import { createLayout } from "./utils/createLayout";

import { UserType } from "./types";

const REQUEST_URL = "https://jsonplaceholder.typicode.com/users";

const folderPath = join(cwd(), "src", "files", "users");

const getUsers = async (): Promise<UserType[] | null> => {
  try {
    const { data } = await axios.get<UserType[]>(REQUEST_URL);

    return data;
  } catch (err) {
    console.log(`Request failed with error: ${err}`);

    return null;
  }
};

const createUsersFolder = async () => {
  try {
    await mkdir(folderPath, { recursive: true });
  } catch {
    console.log("Failed to create the folder");
  }
};

const createUsers = async (users: UserType[]) => {
  await createUsersFolder();

  users?.forEach(async (user) => {
    const filePath = join(folderPath, `${user.name}.html`);

    try {
      const pageContent = pageSkeleton(createLayout(user));

      await writeFile(filePath, pageContent);
    } catch (err) {
      console.log(`Operation failed with error: ${err}`);
    }
  });

  console.log("Users created successfully! \n");
};

const deleteUsers = async () => {
  try {
    const path = join(cwd(), "src", "files");

    await rm(path, { recursive: true });
  } catch (err) {
    console.log(`Operation failed with error: ${err}`);
  }

  console.log("Users deleted successfully! \n");
};

const main = async () => {
  const users = await getUsers();

  if (!users) {
    console.log("0 users found");
    return;
  }

  console.log(
    `
    Hello! Here is the command list:

    create - creates pages with users data
    delete - deletes all the pages
  `
  );

  stdin.on("data", async (data) => {
    const userCommand = data.toString().trim();

    switch (userCommand) {
      case "create":
        await createUsers(users);
        break;
      case "delete":
        await deleteUsers();
        break;
      default:
        console.log("Command not found. Try again");
    }

    console.log("Enter your command");
  });
};

main();
