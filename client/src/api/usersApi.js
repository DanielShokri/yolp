import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/auth"
    : "http://localhost:3001/auth";

const parsed = JSON.parse(localStorage.getItem("persist:users"));

export default axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    Authorization: parsed && JSON.parse(parsed.user).token,
  },
});
