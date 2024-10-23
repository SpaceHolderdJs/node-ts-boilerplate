import { UserService } from "./src/service/user.service";
const usersAPIUrl = "https://jsonplaceholder.typicode.com/users";

(async () => {
  const users = await UserService.getUsers(usersAPIUrl);
  await UserService.renderUsersData(users);
})();
