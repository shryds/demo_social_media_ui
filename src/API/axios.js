import axios from "axios";
import { BASE_URL } from "../CONFIGS/api";

const getInstance = (baseURL = BASE_URL) => {
  console.log("Using baseURL:", baseURL);
  return axios.create({
    baseURL,
    headers: {
      //"Content-Type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("Bearer") || ""}`,
    },
    validateStatus: () => true,
  });
};

const axiosInstance = {
  getInstance,
};

export default axiosInstance;
