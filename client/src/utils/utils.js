export function isVerify(msg) {
  console.log("🚀 ~ file: utils.js ~ line 2 ~ isVerify ~ msg", msg);
  if (msg === "Token is not valid") {
    localStorage.removeItem("user");
    // window.location.replace("/");
  }
}
