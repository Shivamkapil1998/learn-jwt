const env = require("./env.json");

exports.config = function () {
  var node_env = process.env.NODE_ENV || "dev";
  console.log(node_env);
  return env[node_env];
};
