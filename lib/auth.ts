export type UserRole = "admin" | "user";

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
}

export function getCurrentUser(): CurrentUser {
  return {
    id: "1",
    name: "Rohan",
    role: "admin", // Change to "user" for testing
  };
}