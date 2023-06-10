import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const loginUser = async (payload: any) => {
  return await axios.post("http://127.0.0.1:8000/api/user/login", payload);
};

export const registerUser = async (payload: any) => {
  return await axios.post("http://127.0.0.1:8000/api/user/register", payload);
};

export const logoutUser = async () => {
  return await axios.post("http://127.0.0.1:8000/api/user/logout");
};
