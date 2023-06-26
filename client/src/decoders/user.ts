import { object, string } from "superstruct";
import { BookInstanceListDecoder } from "src/decoders/book";

export const UserDecoder = object({
  username: string(),
  books_onloan: BookInstanceListDecoder,
});
