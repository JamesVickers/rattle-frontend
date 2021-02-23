export type Id = string | number;

export type ApiDate = Date | string;

export interface ModelBase {
  id: Id;
  updatedAt?: ApiDate;
  createdAt?: ApiDate;
  deletedAt?: ApiDate;
}
