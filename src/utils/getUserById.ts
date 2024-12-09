import { getUsers } from "./getUsers";

export const getUserById = async (userId: number) => {
  const users = await getUsers();

  return users?.find(({ id }) => id === userId);
};
