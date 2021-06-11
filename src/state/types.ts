// When you need to use any and don't want this eslint comment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SilentAny = any;

export type Id = string | number;

export type ApiDate = Date | string;

export interface ModelBase {
  id: Id;
  updatedAt?: ApiDate;
  createdAt?: ApiDate;
  deletedAt?: ApiDate;
}

export type ModalAnimationType = "none" | "slide" | "fade";

export type ModalPresentationStyle =
  | "fullScreen"
  | "pageSheet"
  | "formSheet"
  | "overFullScreen";
