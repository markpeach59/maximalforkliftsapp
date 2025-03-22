import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/orders/all";

export function getAllOrders() {
  return http.get(apiEndPoint);
}
