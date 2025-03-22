import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/auth";

const tokenKey = "token";

http.setJwt(getJwt());

export  async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export  function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export  function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("restricted");
}

export function getJwt() {
  const token = localStorage.getItem("token");
  console.log("Retrieved JWT token:", token ? "Token exists" : "No token");
  return token;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
   // console.log(jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

const exportedAuthObject = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};

export default exportedAuthObject;
