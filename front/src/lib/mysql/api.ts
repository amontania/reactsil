import axios from "axios";

const BASE_URL = 'http://localhost:8080';

import { setupInterceptorsTo } from  "./interceptor";
const api = setupInterceptorsTo(
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;



