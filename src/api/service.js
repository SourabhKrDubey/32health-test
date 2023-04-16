import { Api } from "./Api";

export const fetchUsersApi = () => {
  return Api.get("/users");
};
