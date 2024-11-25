import { ServerResponse } from "http";

import { User } from "./types/User";

const isExistParam = (
  param: string | null,
  isNum = false
): string | undefined => (param ? param : undefined);

const isExistNumParam = (param: string | null): number =>
  param ? parseInt(param) : 0;

const sendJsonResponse = (res: ServerResponse, obj: Partial<User> | User[]) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: obj }));
};

const parseParams = (url: string) => {
  const params = new URLSearchParams(url);

  params.forEach((value, key) => {
    if (key.includes("?") || key.includes("/"))
      params.set(key.replaceAll("?", "").replaceAll("/", ""), value);
  });
  return removeUndefinedFields({
    name: isExistParam(params.get("name")),
    age: isExistNumParam(params.get("age")),
    email: isExistParam(params.get("email")),
    skills: isExistParam(params.get("skills")),
    id: isExistNumParam(params.get("id")),
    city: isExistParam(params.get("city")),
  });
};

function removeUndefinedFields(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
}

export { isExistParam, isExistNumParam, sendJsonResponse, parseParams };
