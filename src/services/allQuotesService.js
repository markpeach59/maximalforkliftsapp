import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/quotes/all";

export function getAllQuotes() {
  return http.get(apiEndPoint);
}
