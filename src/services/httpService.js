import axios from "axios";

import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("logging an error", error);

    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  console.log("Setting JWT token:", jwt ? "Token exists" : "No token");
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
};

export default httpService;
