import { HTTP_CLIENT } from "./httpClient";

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  website?: string;
  company?: {
    name: string;
  };
}
class UserService {
  getAllUser() {
    return HTTP_CLIENT.get<User[]>("/users");
  }

  deleteUser(id: number) {
    return HTTP_CLIENT.delete(`/users/${id}`);
  }
}

const userService = new UserService();

export default userService;
