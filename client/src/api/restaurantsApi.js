import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/restaurants"
    : "http://localhost:3001/api/restaurants";

export default axios.create({
  baseURL,
  headers: { "content-type": "application/json" },
});
