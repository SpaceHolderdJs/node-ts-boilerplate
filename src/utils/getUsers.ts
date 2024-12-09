import { cwd } from "node:process";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { UserType } from "../types";

export const getUsers = async (): Promise<UserType[] | null> => {
  try {
    const path = join(cwd(), "src", "data", "users.json");
    const data = await readFile(path, "utf-8");
    const users: UserType[] = JSON.parse(data);

    return users || [];
  } catch (err) {
    console.log(err);
    return null;
  }
};
