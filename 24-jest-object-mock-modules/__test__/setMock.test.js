jest.setMock("../module-2", jest.fn(() => 42));
const module2 = require("../module-2");

test("setMock", () => {
  expect(module2()).toBe(42);
});
