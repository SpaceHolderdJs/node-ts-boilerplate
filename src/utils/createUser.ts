import { join } from "node:path";
import { cwd } from "node:process";
import { writeFile } from "node:fs/promises";
import { UserType } from "../types";
import { getUsers } from "./getUsers";

export const createUser = async (user: Omit<UserType, "id">) => {
  try {
    const path = join(cwd(), "src", "data", "users.json");
    const users = await getUsers();

    const userId = (users?.at(-1)?.id || 0) + 1;
    users?.push({ ...user, id: userId });

    await writeFile(path, JSON.stringify(users));
  } catch {
    return null;
  }
};
