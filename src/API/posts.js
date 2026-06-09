//axios calls here
import { ENDPOINTS } from "../Configs/api";
import axios from "./axios";
import { assertOk, reportError } from "./errorHandler";

export const getPosts = async () => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.allpost);
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load posts.");
    throw err;
  }
};
export const authGetPosts = async () => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.authAllPost);
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load posts.");
    throw err;
  }
};

export const getPostDetail = async (id) => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.postDetail(id));
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load post.");
    throw err;
  }
};

export const getComments = async (id) => {
  try {
    const res = await axios.getInstance().get(ENDPOINTS.allComments(id));
    assertOk(res);
    return res.data;
  } catch (err) {
    reportError(err, "Failed to load comments.");
    throw err;
  }
};

export const addLike = async (id) => {
  try {
    const res = await axios.getInstance().post(ENDPOINTS.like(id));
    assertOk(res);
  } catch (err) {
    reportError(err, "Failed to like post.");
    throw err;
  }
};
export const removeLike = async (id) => {
  try {
    const res = await axios.getInstance().delete(ENDPOINTS.like(id));
    assertOk(res);
  } catch (err) {
    reportError(err, "Failed to remove like.");
    throw err;
  }
};

export async function createPost(payload) {
  try {
    const res = await axios.getInstance().post(ENDPOINTS.CreatePost, payload);
    assertOk(res);
    return res;
  } catch (err) {
    reportError(err, "Failed to create post.");
    throw err;
  }
}

export async function deletePost(id) {
  try {
    const res = await axios.getInstance().delete(ENDPOINTS.deletePost(id));
    assertOk(res);
    return res;
  } catch (err) {
    reportError(err, "Failed to delete post.");
    throw err;
  }
}

export async function deleteComment(commentId) {
  try {
    const res = await axios
      .getInstance()
      .delete(ENDPOINTS.deleteComment(commentId));
    assertOk(res);
    return res;
  } catch (err) {
    reportError(err, "Failed to delete comment.");
    throw err;
  }
}

export async function createComment(id, payload) {
  try {
    const res = await axios
      .getInstance()
      .post(ENDPOINTS.CreateComment(id), { comment: payload });
    assertOk(res);
    return res;
  } catch (err) {
    reportError(err, "Failed to post comment.");
    throw err;
  }
}
