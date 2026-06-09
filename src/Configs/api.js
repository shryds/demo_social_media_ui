export const BASE_URL = "https://demo-social-media-application.onrender.com/";

export const DEPLOYED_URL = window.location.origin;

export const VERSION = "v1";

export const ENDPOINTS = {
  allpost: "/post/all",
  userlogin: "/user/login",
  postDetail: (id) => `/post/${id}`,
  allComments: (id) => `/post/${id}/comments/all`,
  userSignUp: "/user/",
  me: "/user/auth/me",
  like: (id) => `/post/${id}/like`,
  authAllPost: "/post/user/all",
  CreatePost: "/post/",
  CreateComment: (id) => `post/${id}/comment`,
  deletePost: (id) => `/post/${id}`,
  deleteComment: (commentId) => `/post/comment/${commentId}`,
  userPosts: "user/posts/me",
  userComments: "user/comments/me",
};
