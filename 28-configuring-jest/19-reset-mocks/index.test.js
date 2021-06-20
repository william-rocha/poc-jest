const mockFn = jest.fn(() => 42);

test("1", () => {
  expect(mockFn).not.toHaveBeenCalled();
  expect(mockFn()).toBeUndefined();
  expect(mockFn).toHaveBeenCalled();
});

test("2", () => {
  expect(mockFn).not.toHaveBeenCalled();
  expect(mockFn()).toBeUndefined();
  expect(mockFn).toHaveBeenCalled();
});
