require("./matchMedia.mock"); // Must be imported before the tested file

describe("myMethod()", () => {
  test("window.matchMedia", () => {
    expect(window.matchMedia).toBeDefined();
    expect(window.name).toBe("nodejs");
    expect(window.matchMedia().addListener).toBeDefined();
  });
});
