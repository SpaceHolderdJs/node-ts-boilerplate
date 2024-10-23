// const fs = require("fs");
// const fsPromises = require("fs").promises;
// import User from "/user.";
import { writeFile } from "fs/promises";
import { User } from "./src/types/user.intrface";
import { createUserCard } from "./src/static/createUserCard";

const usersAPIUrl = "https://jsonplaceholder.typicode.com/users";
(async () => {
  const userData: User[] = await fetch(usersAPIUrl).then((res) => res.json());
  for (let user of userData) {
    const userObject = user as User;
    await writeFile(
      `./files/users/user-${userObject.id}.html`,
      createUserCard(userObject)
    );
  }
})();
