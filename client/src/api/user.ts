import { IgnoreResponseDecoder } from "src/decoders/common";
import axios, { ApiError } from "./axios";
import { LoginPayload, RegisterPayload } from "src/types/authenticate";
import { User } from "src/types/user";
import { UserDecoder } from "src/decoders/user";
import { ApiData } from "src/types/ApiTypes";

export const loginUser = async (payload: LoginPayload): Promise<ApiData<unknown, ApiError>> => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/login",
    IgnoreResponseDecoder,
    payload
  );
};

export const registerUser = async (payload: RegisterPayload): Promise<ApiData<unknown, ApiError>> => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/register",
    IgnoreResponseDecoder,
    payload
  );
};

export const logoutUser = async (): Promise<ApiData<unknown, ApiError>> => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/logout",
    IgnoreResponseDecoder
  );
};

export const fetchUser = async (): Promise<ApiData<User, ApiError>> => {
  return await axios.get<User, ApiError>(
    "http://127.0.0.1:8000/api/user/",
    UserDecoder,
    { withCredentials: true }
  );
};

export const borrowBook = async (id: number): Promise<ApiData<unknown, ApiError>> => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/borrow-book",
    IgnoreResponseDecoder,
    { id },
    { withCredentials: true }
  );
};

export const returnBook = async (id: string): Promise<ApiData<unknown, ApiError>> => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/return-book",
    IgnoreResponseDecoder,
    { id },
    { withCredentials: true }
  )
}
