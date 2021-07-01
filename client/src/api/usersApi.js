import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/auth"
    : "http://localhost:3001/auth";

export default axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("user"))?.token,
  },
});
