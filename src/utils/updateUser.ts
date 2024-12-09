import { join } from "node:path";
import { cwd } from "node:process";
import { writeFile } from "node:fs/promises";
import { getUsers } from "./getUsers";
import { UserType } from "../types";

export const updateUser = async (updatedUser: Partial<UserType>) => {
  try {
    const path = join(cwd(), "src", "data", "users.json");
    const users = await getUsers();

    if (!users) return null;

    const updatedUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return {
          ...user,
          ...updatedUser,
          name: updatedUser.name || user.name,
          age: updatedUser.age || user.age,
          city: updatedUser.city || user.city,
          skills:
            updatedUser.skills!.length > 0 ? updatedUser.skills : user.skills,
        };
      }

      return user;
    });

    await writeFile(path, JSON.stringify(updatedUsers));
  } catch {
    return null;
  }
};
