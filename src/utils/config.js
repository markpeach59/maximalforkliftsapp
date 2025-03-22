import config from "../config.json";

// Get the current environment
const env = process.env.NODE_ENV || "development";
const apiURL = config[env].apiURL;

const appConfig = {
  apiURL
};

export default appConfig;
