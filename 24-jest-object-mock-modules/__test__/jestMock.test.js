const module1 = require("../module-1");
const module2 = require("../module-2");
const virtual = require("../virtual");

jest.mock("../module-1");
jest.mock("../module-2", () => {
  return jest.fn(() => 42);
});
jest.mock(
  "../virtual",
  () => {
    return () => "virtual";
  },
  {
    virtual: true
  }
);

test("auto", () => {
  expect(module1()).toBeUndefined();
});

test("factory", () => {
  expect(module2()).toBe(42);
});

test("virtual", () => {
  expect(virtual()).toBe("virtual");
});
