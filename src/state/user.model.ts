import { ModelBase } from "./types";

export interface User extends ModelBase {
  name: string;
  email: string;
  profileImage?: "PUBLISHED" | "UNPUBLISHED";
  isAdmin: boolean;
}
