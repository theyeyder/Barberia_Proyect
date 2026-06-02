import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:400/api"
});

export default api;
