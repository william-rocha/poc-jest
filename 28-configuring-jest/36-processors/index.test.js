test("process", () => {
  expect(require("./process-me.not-test")).toMatch(/process-me.not-test/);
});

test("ignore", () => {
  expect(require("./ignore-me.not-test")).toBe("To be ignored");
});
