import { Id, ModelBase } from "./types";

export interface Message extends ModelBase {
  conversationId: Id;
  userId: Id;
  text: string;
  // message_attachments?: MessageAttachment[];
  // removedBy?: "user" | "moderator";
}
