const utils = require("./utils-2");

test("toUpperCase", () => {
  expect(utils.toUpperCase("arg")).toBe("ARG");
});
