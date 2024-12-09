import { UserType } from "../types";

type ValidationUserDataType = UserType & Record<string, unknown>;

export const validateUser = (user: ValidationUserDataType): UserType | null => {
  const fields: Array<keyof typeof user> = [
    "id",
    "name",
    "age",
    "city",
    "skills",
    "email",
  ];

  const validationResult = fields.every((key) => user.hasOwnProperty(key));

  if (validationResult) return user as UserType;

  return null;
};
