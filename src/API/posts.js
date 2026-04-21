//axios calls here
import { ENDPOINTS } from "../CONFIGS/api";
import axios from "./axios";

export const getPosts = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.allpost);
  return res.data;
};

export const getPostDetail = async (id) => {
  const res = await axios.getInstance().get(ENDPOINTS.postDetail(id));
  return res.data;
};

export const getComments = async (id) => {
  const res = await axios.getInstance().get(ENDPOINTS.allComments(id));
  return res.data;
};

//export const createPost