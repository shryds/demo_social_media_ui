import { ENDPOINTS } from "../CONFIGS/api";
import axios from "./axios";

export async function userSignUp(payload) {
  const res = await axios.getInstance().post(ENDPOINTS.userSignUp, payload);
  return res;
}

export const userLogin = async (payload) => {
  const res = await axios.getInstance().post(
    ENDPOINTS.userlogin,payload,
  );

  return res;
};

export const userMe = async ()=>{
    const res=await axios.getInstance().get(ENDPOINTS.me)
    return res
}
