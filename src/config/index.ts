import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "production";
const stage = process.env.STAGE || "production";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
  },
  envConfig
);
