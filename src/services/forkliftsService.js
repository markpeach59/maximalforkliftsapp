import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/forklifts";
const apiEndPointR = config.apiURL + "/forklifts/list";

export function getForklifts() {
  return http.get(apiEndPoint);
}

export function getRestrictedForklifts() {
  return http.get(apiEndPointR);
}
