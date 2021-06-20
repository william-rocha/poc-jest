jest.retryTimes(3);

test("retryTimes", () => {
  console.log("retryTimes fail");
  expect(true).toBe(false);
});
