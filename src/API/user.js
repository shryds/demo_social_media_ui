import { ENDPOINTS } from "../CONFIGS/api";
import axios from "./axios";

export async function userSignUp(payload) {
  const res = await axios.getInstance().post(ENDPOINTS.userSignUp, payload);
  return res;
}

export const userLogin = async (payload) => {
  const res = await axios.getInstance().post(ENDPOINTS.userlogin, payload);

  return res;
};

export const userMe = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.me);
  return res;
};
export const userPosts = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.userPosts);
  return res.data;
};
export const userComments = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.userComments);
  return res.data;
};
