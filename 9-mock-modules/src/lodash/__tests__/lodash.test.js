const lodash = require("lodash");

// jest.unmock("lodash");

test("repeat", () => {
  expect(lodash.repeat("A", 3)).toBe("BBB");
});

test("isEmpty", () => {
  expect(lodash.isEmpty([])).toBe(true);
});
