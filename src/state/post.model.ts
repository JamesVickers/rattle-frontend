import { ModelBase } from "./types";
import { User } from "./user.model";

export interface Post extends ModelBase {
  title: string;
  body: string;
  status: "PUBLISHED" | "UNPUBLISHED";
  author: User;
}
 