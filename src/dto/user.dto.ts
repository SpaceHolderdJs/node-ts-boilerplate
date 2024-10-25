export const UserDTO = {
  id: "",
  name: "",
  age: 0,
  email: "",
  skills: [""],
  city: "",
};

const isUserDTOType = (obj: any): Boolean => {
  return (
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.age === "number" &&
    typeof obj.email === "string" &&
    Array.isArray(obj.skills) &&
    obj.skills.every((skill: string) => typeof skill === "string") &&
    typeof obj.city === "string"
  );
};

export type UserDTOType = typeof UserDTO;
export { isUserDTOType };
