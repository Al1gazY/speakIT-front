import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const authConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

