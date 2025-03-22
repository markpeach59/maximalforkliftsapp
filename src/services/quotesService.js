import http from "./httpService";
import config from "../utils/config";

const apiEndPoint = config.apiURL + "/quotes";

export function getQuotes() {
  console.log("Requesting quotes from:", apiEndPoint);
  return http.get(apiEndPoint)
    .catch(error => {
      console.error("Error in getQuotes:", error);
      throw error;
    });
}

export function savequote(quote) {
  //console.log("quote items ", quote);

  return http.post(apiEndPoint, quote);
}

export function getQuoteDetail(id) {
  return http.get(apiEndPoint + "/" + id);
}

export function createOrderFromQuote(id, newponumber) {
  return http.patch(apiEndPoint + "/" + id, {
    ponumber: newponumber
  });
}

export function reassignQuote(id, newuserid) {
  return http.patch(apiEndPoint + "/reassign/" + id, {
    userid: newuserid,
  });
}

export function saveMarkup(id, newmarkup) {
    return http.patch(apiEndPoint + "/savemarkup/" + id, {
      markup: newmarkup,
    });
}
