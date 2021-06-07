import { Conversation } from "./conversation.model";
import { ModelBase } from "./types";
import { User } from "./user.model";

export interface Message extends ModelBase {
  conversation: Conversation;
  user: User;
  text: string;
  // message_attachments?: MessageAttachment[];
  // removedBy?: "user" | "moderator";
}
