import config from "../utils/config";
import auth from "./authService";
import axios from "axios";

const apiEndPoint = config.apiURL + "/dealers";

export function getDealers() {
  // Get the JWT token
  const token = auth.getJwt();
  
  if (!token) {
    console.error("No JWT token available for dealers request");
    throw new Error("Authentication required. Please log in again.");
  }
  
  // Set the token in the headers for this specific request
  const headers = {
    "x-auth-token": token
  };
  
  return axios.get(apiEndPoint, { headers });
}

export function registerDealer(dealername, dealermarkup) {
  // Get the JWT token
  const token = auth.getJwt();
  
  if (!token) {
    console.error("No JWT token available for register dealer request");
    throw new Error("Authentication required. Please log in again.");
  }
  
  // Set the token in the headers for this specific request
  const headers = {
    "x-auth-token": token
  };
  
  return axios.post(apiEndPoint, { dealername, dealermarkup }, { headers });
}

export function getDealerDetail(id) {
  const dealerEndPoint = config.apiURL + "/dealers/" + id;
  
  // Get the JWT token
  const token = auth.getJwt();
  
  if (!token) {
    console.error("No JWT token available for dealer detail request");
    throw new Error("Authentication required. Please log in again.");
  }
  
  // Set the token in the headers for this specific request
  const headers = {
    "x-auth-token": token
  };
  
  return axios.get(dealerEndPoint, { headers });
}
