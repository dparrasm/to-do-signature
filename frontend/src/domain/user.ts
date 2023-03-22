export interface User {
  id: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
}

export type UserLogin = Omit<User, "id" | "name" | "surname">;
export type UserSignUp = Omit<User, "id">;
