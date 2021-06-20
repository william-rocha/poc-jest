const auth = require("../auth");
const authActual = jest.requireActual("../auth");

jest.enableAutomock();

test("requireActual", () => {
  expect(authActual.authorize()).toBe("original");
  expect(auth.authorize()).toBe("mock");
});
