import { BookInstance } from "src/types/book";

export interface User {
  username: string;
  books_onloan: BookInstance[];
}
