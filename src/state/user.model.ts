import { Id, ModelBase } from "./types";

export interface User extends ModelBase {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: {
    id: Id;
    image: { publicUrlTransformed: string };
    altText?: string;
  };
  isAdmin: boolean;
}
