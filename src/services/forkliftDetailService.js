import config from "../utils/config";
import auth from "./authService";
import axios from "axios";

export function getForkliftDetail(name) {
  const apiEndPoint = config.apiURL + "/forkliftdetails/" + name;
  
  // Log the request for debugging
  console.log("Requesting forklift detail for:", name);
  console.log("API endpoint:", apiEndPoint);
  
  // Get the JWT token
  const token = auth.getJwt();
  
  if (!token) {
    console.error("No JWT token available for forklift detail request");
    throw new Error("Authentication required. Please log in again.");
  }
  
  // Set the token in the headers for this specific request
  const headers = {
    "x-auth-token": token
  };
  
  console.log("Making authenticated request with token");
  
  // Make the request with the token in the headers
  return axios.get(apiEndPoint, { headers });
}
