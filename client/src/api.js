import axios from "axios";

// VITE_API_BASE_URL comes from .env (or .env.production) when you run `npm run build`.
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance that automatically prefixes every request with API_BASE
const http = axios.create({
  baseURL: API_BASE,
  // You can add common headers here if needed, e.g.:
  // headers: { "Content-Type": "application/json" }
});

export default http;
