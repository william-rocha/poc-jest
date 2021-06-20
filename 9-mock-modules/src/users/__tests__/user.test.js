const user = require("../user");

jest.mock("../user");

test("use mock data", () => {
  expect(user.name).toBe("Mock User");
});
