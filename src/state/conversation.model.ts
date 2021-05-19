import { ModelBase } from "./types";
import { User } from "./user.model";

export interface Conversation extends ModelBase {
  title: string;
  member: User;
}
