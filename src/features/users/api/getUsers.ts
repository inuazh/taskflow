import type { User, UsersResponse } from "./types";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://dummyjson.com/users/?limit=0");

  if (!response.ok) {
    throw new Error("fetch error");
  }

  const data = (await response.json()) as UsersResponse;
  return data.users;
}
