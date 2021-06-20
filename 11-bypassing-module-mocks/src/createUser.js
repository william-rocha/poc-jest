const fetch = require("node-fetch");

const createUser = async () => {
  const response = await fetch("http://website.com/users", { method: "POST" });
  const userId = await response.text();
  return userId;
};

module.exports = createUser;
