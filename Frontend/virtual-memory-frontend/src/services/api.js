import axios from "axios";

const api = axios.create({
  baseURL: "https://virtual-memory-explorer.onrender.com",
});

export default api;
