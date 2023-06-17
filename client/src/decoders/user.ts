import { object, string } from "superstruct";

export const UserDecoder = object({
    username: string()
})