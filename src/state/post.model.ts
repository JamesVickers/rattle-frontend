import { ModelBase } from "./types";

export interface Post extends ModelBase {
  title: string;
  body: string;
  status: "PUBLISHED" | "UNPUBLISHED";
  author?: User;
}
