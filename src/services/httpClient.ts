import axios from "axios";

export const HTTP_CLIENT = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
