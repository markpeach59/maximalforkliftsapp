import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/dealers";

export function getDealers() {
  return http.get(apiEndPoint);
}

export function registerDealer(dealername, dealermarkup) {
  return http.post(apiEndPoint, { dealername, dealermarkup });
}

export function getDealerDetail(id) {
  const apiEndPoint = config.apiURL + "/dealers/" + id;
  return http.get(apiEndPoint);
}
