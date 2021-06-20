const StringUtils = {
  toUpperCase(arg) {
    return arg && arg.toUpperCase();
  }
};

test("1", () => {
  const spy = jest
    .spyOn(StringUtils, "toUpperCase")
    .mockImplementation(() => "MOCK");

  expect(StringUtils.toUpperCase("arg")).toBe("MOCK");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeTruthy();
});

test("2", () => {
  expect(StringUtils.toUpperCase("arg")).toBe("ARG");
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeFalsy();
});
