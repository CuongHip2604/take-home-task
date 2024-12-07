import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params: Record<string, string | boolean>) => {
    const paramsSerialized = Object.keys(params)
      .map(
        (_key) =>
          `${encodeURIComponent(_key)}=${encodeURIComponent(params[_key])}`
      )
      .join("&");
    return paramsSerialized;
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
