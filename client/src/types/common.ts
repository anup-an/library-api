import { Nullable } from "./ApiTypes";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface FilterQuery {
  [x: string]:
    | {
        [x: string]: string;
      }
    | string;
}

export interface ListQuery {
  search: string;
  search_fields: string[];
  filter: FilterQuery;
  ordering: string;
  page: number;
  page_size: number;
}

export interface CollectionPayload<T> {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: T[];
}
