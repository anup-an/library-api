import { array, nullable, number, object, string } from "superstruct";

export const AuthorDecoder = object({
  id: number(),
  name: string(),
});

export const GenreDecoder = object({
  id: number(),
  name: string(),
});

export const LanguageDecoder = object({
  id: number(),
  name: string(),
});

export const BookDecoder = object({
  id: number(),
  title: string(),
  series: nullable(string()),
  author: array(AuthorDecoder),
  description: string(),
  edition: nullable(string()),
  isbn: string(),
  pages: nullable(number()),
  publisher: nullable(string()),
  book_image: nullable(string()),
  book_format: nullable(string()),
  genres: array(GenreDecoder),
  language: LanguageDecoder,
});

export const BookListDecoder = object({
  count: number(),
  next: nullable(string()),
  previous: nullable(string()),
  results: array(BookDecoder),
});
