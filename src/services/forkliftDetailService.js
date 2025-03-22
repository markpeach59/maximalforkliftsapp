import http from "./httpService";
import config from "../utils/config";

export function getForkliftDetail(name) {
  const apiEndPoint = config.apiURL + "/forkliftdetails/" + name;
  return http.get(apiEndPoint);
}
