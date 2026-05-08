import axios from "axios";

const API = axios.create({
  baseURL: "https://capturecraft-backend.onrender.com/api",
});

export default API;