//axios calls here
import { ENDPOINTS } from "../CONFIGS/api";
import axios from "./axios";

export const getPosts = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.allpost);
  return res.data;
};
export const authGetPosts = async () => {
  const res = await axios.getInstance().get(ENDPOINTS.authAllPost);
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

export const addLike = async (id) => {
  const res = await axios.getInstance().post(ENDPOINTS.like(id));
};
export const removeLike = async (id) => {
  const res = await axios.getInstance().delete(ENDPOINTS.like(id));
};

export async function createPost(payload) {
  const res = await axios.getInstance().post(ENDPOINTS.CreatePost, payload);
  return res;
}

export async function createComment(id,payload) {
  const res = await axios.getInstance().post(ENDPOINTS.CreateComment(id), {comment:payload});
  return res;
}
