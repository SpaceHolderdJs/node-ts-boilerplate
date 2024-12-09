import { join } from "node:path";
import { cwd } from "node:process";
import { writeFile } from "node:fs/promises";
import { getUsers } from "./getUsers";

export const deleteUserById = async (
  userId: number
) => {
  try {
    const path = join(cwd(), "src", "data", "users.json");
    const users = await getUsers();
    const updatedUsers = users?.filter(({ id }) => id !== userId) || null;
    
    await writeFile(path, JSON.stringify(updatedUsers));
  } catch {
    return null;
  }
};
