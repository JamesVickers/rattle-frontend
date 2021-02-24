import { Id, ModelBase } from "./types";

export interface User extends ModelBase {
  name: string;
  email: string;
  profileImage?: {
    id: Id;
    image: { publicUrlTransformed: string };
    altText?: string;
  };
  isAdmin: boolean;
}
