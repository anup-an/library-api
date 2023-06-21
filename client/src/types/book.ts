import { Nullable } from "src/types/ApiTypes";

type BookFormat = "p" | "m" | "k" | "e" | "h";

interface Author {
  name: string;
}

interface Genre {
  name: string;
}

interface Language {
  name: string;
}

export interface Book {
  id: number;
  title: string;
  series: Nullable<string>;
  author: Author[];
  description: string;
  edition: Nullable<string>;
  isbn: string;
  pages: Nullable<number>;
  publisher: Nullable<string>;
  book_image: Nullable<string>;
  book_format: Nullable<BookFormat>;
  genres: Genre[];
  language: Language[];
}
