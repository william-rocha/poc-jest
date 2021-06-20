jest.doMock("../module-1");
jest.doMock("../module-2", () => {
  return jest.fn(() => 42);
});
jest.doMock(
  "../virtual",
  () => {
    return () => "virtual";
  },
  {
    virtual: true
  }
);

const module1 = require("../module-1");
const module2 = require("../module-2");
const virtual = require("../virtual");

test("auto", () => {
  expect(module1()).toBeUndefined();
});

test("factory", () => {
  expect(module2()).toBe(42);
});

test("virtual", () => {
  expect(virtual()).toBe("virtual");
});
