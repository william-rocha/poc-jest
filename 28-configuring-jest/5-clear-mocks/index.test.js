const mockFn = jest.fn();

test("1", () => {
  expect(mockFn).not.toHaveBeenCalled();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});

test("2", () => {
  expect(mockFn).not.toHaveBeenCalled();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
