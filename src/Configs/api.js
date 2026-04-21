export const BASE_URL = "http://localhost:1311";

export const DEPLOYED_URL = window.location.origin;

export const VERSION = "v1";

export const ENDPOINTS = {
  allpost: "/post/all",
  userlogin: "/user/login",
  postDetail: (id) => `/post/${id}`,
  allComments: (id) => `/post/${id}/comments/all`,
  userSignUp: "/user/",
  me: "/user/auth/me",
};
