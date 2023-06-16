import { IgnoreResponseDecoder } from "src/decoders/common";
import axios, { ApiError } from "./axios";
import { LoginPayload, RegisterPayload } from "src/types/authenticate";

export const loginUser = async (payload: LoginPayload) => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/login",
    IgnoreResponseDecoder,
    payload
  );
};

export const registerUser = async (payload: RegisterPayload) => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/register",
    IgnoreResponseDecoder,
    payload
  );
};

export const logoutUser = async () => {
  return await axios.post<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/logout",
    IgnoreResponseDecoder
  );
};

export const fetchUser = async () => {
  return await axios.get<unknown, ApiError>(
    "http://127.0.0.1:8000/api/user/",
    IgnoreResponseDecoder
  );
};
