import { API_URL } from "../config";
import { type User } from "../users/types";

export async function createUser(user: User) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response;
  }

  throw new Error("Error creating an user");
}
