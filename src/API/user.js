import { ENDPOINTS } from "../Configs/api";
import axios from "./axios";
import { assertOk, reportError } from "./errorHandler";

export async function userSignUp(payload) {
  try {
    const res = await axios.getInstance().post(ENDPOINTS.userSignUp, payload);
    return res;
  } catch (err) {
    reportError(err, "Unable to reach the server. Please try again.");
    throw err;
  }
}

export const userLogin = async (payload) => {
  try {
    const res = await axios.getInstance().post(ENDPOINTS.userlogin, payload);
    return res;
  } catch (err) {
    reportError(err, "Unable to reach the server. Please try again.");
    throw err;
  }
};

export const userMe = async () => {
  if (!localStorage.getItem("Bearer")){
    throw new Error("not loggedin")
  }
  const res = await axios.getInstance().get(ENDPOINTS.me);
  return res;
};
export const userPosts = async () => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.userPosts);
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load your posts.");
    throw err;
  }
};
export const userComments = async () => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.userComments);
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load your comments.");
    throw err;
  }
};
