import { API_URL } from "../config";
import { UserId, type User, type UserWithId } from "../users/types";

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

export async function editUser(user: UserWithId) {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  if (response.ok) {
    return response;
  }

  throw new Error("Error updating an user");
}

export async function deleteUser(id: UserId) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return response;
  }

  throw new Error("Error deleting a user");
}
