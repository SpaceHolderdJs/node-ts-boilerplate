import { UserType } from "../types";

export const validateUser = (
  user: unknown,
  type: "create" | "update"
): Omit<UserType, "id"> | UserType | null => {
  if (typeof user !== "object" || user === null) return null;

  const u = user as Record<string, unknown>;

  if (type === "update" && typeof u.id !== "number") return null;

  return {
    ...(type === "update" && { id: u.id }),
    name: typeof u.name === "string" ? u.name : null,
    age: typeof u.age === "number" ? u.age : null,
    city: typeof u.city === "string" ? u.city : null,
    skills: Array.isArray(u.skills) ? (u.skills as string[]) : [],
    email: typeof u.email === "string" ? u.email : null,
  };
};
