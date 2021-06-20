test("getMockName", () => {
  const mockFn = jest.fn().mockName("mockedFunction");
  expect(mockFn.getMockName()).toBe("mockedFunction");
});

test("mock.calls", () => {
  const mockFn = jest.fn();
  mockFn(1, 2);
  mockFn(3, 4);

  expect(mockFn.mock.calls).toEqual([[1, 2], [3, 4]]);
});

test("mock.results", () => {
  const mockFn = jest.fn().mockImplementation(returnType => {
    if (returnType === "ok") {
      return 1;
    }

    if (returnType === "error") {
      throw new Error("error");
    }

    if (returnType === "incomplete") {
      console.log(mockFn.mock.results[mockFn.mock.results.length - 1].type);
      return 2;
    }
  });

  try {
    mockFn("ok");
    mockFn("incomplete");
    mockFn("error");
  } catch (error) {
    // ignore
  }

  expect(mockFn.mock.results[0].type).toBe("return");
  expect(mockFn.mock.results[0].value).toBe(1);

  expect(mockFn.mock.results[1].type).toBe("return");
  expect(mockFn.mock.results[1].value).toBe(2);

  expect(mockFn.mock.results[2].type).toBe("throw");
  expect(mockFn.mock.results[2].value.message).toBe("error");
});

test("mock.instances", () => {
  const mockFn = jest.fn();

  const a = new mockFn();
  const b = new mockFn();

  mockFn.mock.instances[0] === a;
  mockFn.mock.instances[1] === b;
});

test("mockFn.mockClear", () => {
  const mockFn = jest.fn().mockImplementation(() => 42);
  const MockClass = jest.fn();

  expect(mockFn()).toBe(42);
  new MockClass();

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);

  mockFn.mockClear();
  MockClass.mockClear();

  expect(mockFn()).toBe(42);
  new MockClass();

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);
});

test("mockFn.mockReset", () => {
  const mockFn = jest.fn().mockImplementation(() => 42);
  const MockClass = jest.fn();

  expect(mockFn()).toBe(42);
  new MockClass();

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);

  mockFn.mockReset();
  MockClass.mockReset();

  expect(mockFn()).toBeUndefined();
  new MockClass();

  expect(mockFn.mock.calls).toHaveLength(1);
  expect(MockClass.mock.instances).toHaveLength(1);
});

test("mockFn.mockRestore", () => {
  const StringUtils = {
    toUpperCase(arg) {
      return arg && arg.toUpperCase();
    }
  };

  const spy = jest
    .spyOn(StringUtils, "toUpperCase")
    .mockImplementation(() => "MOCK");

  expect(StringUtils.toUpperCase("arg")).toBe("MOCK");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeTruthy();

  spy.mockRestore();

  expect(StringUtils.toUpperCase("arg")).toBe("ARG");
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeFalsy();
});

describe("mockImplementation", () => {
  it("function", () => {
    const mockFn1 = jest.fn().mockImplementation(() => 42);
    const mockFn2 = jest.fn(() => 42);

    expect(mockFn1()).toBe(42);
    expect(mockFn2()).toBe(42);
  });

  it("class", () => {
    const SomeClass = jest.fn();
    const mMock = jest.fn();

    SomeClass.mockImplementation(() => {
      return {
        m: mMock
      };
    });

    const some = new SomeClass();
    some.m("a", "b");
    expect(mMock.mock.calls).toEqual([["a", "b"]]);
  });
});

test("mockImplementationOnce", () => {
  const mockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  expect(mockFn()).toBe("first call");
  expect(mockFn()).toBe("second call");
  expect(mockFn()).toBe("default");
  expect(mockFn()).toBe("default");
});

test("mockName", () => {
  const mockFn = jest.fn().mockName("mockedFunction");
  // expect(mockFn).toHaveBeenCalled();
});

test("mockReturnThis", () => {
  const mock = {
    chainedOne: jest.fn().mockReturnThis(),
    chainedTwo: jest.fn(function() {
      return this;
    })
  };

  expect(mock.chainedOne().chainedTwo).toEqual(mock.chainedTwo);
  expect(mock.chainedTwo().chainedOne).toEqual(mock.chainedOne);
});

test("mockReturnValue", () => {
  const mock = jest.fn();

  mock.mockReturnValue(42);
  expect(mock()).toBe(42); // 42

  mock.mockReturnValue(43);
  expect(mock()).toBe(43); // 43
});

test("mockReturnValueOnce", () => {
  const mockFn = jest
    .fn()
    .mockReturnValue("default")
    .mockReturnValueOnce("first call")
    .mockReturnValueOnce("second call");

  expect(mockFn()).toBe("first call");
  expect(mockFn()).toBe("second call");
  expect(mockFn()).toBe("default");
  expect(mockFn()).toBe("default");
});

test("mockResolvedValueOnce", async () => {
  const mockFn = jest
    .fn()
    .mockResolvedValue("default")
    .mockResolvedValueOnce("first call")
    .mockResolvedValueOnce("second call");

  expect(await mockFn()).toBe("first call");
  expect(await mockFn()).toBe("second call");
  expect(await mockFn()).toBe("default");
  expect(await mockFn()).toBe("default");
});

test("mockRejectedValueOnce", async () => {
  const asyncMock = jest
    .fn()
    .mockRejectedValue(new Error("error"))
    .mockResolvedValueOnce("first call")
    .mockRejectedValueOnce(new Error("first error"));

  await asyncMock();

  try {
    await asyncMock();
  } catch (error) {
    expect(error.message).toBe("first error");
  }

  try {
    await asyncMock();
  } catch (error) {
    expect(error.message).toBe("error");
  }

  try {
    await asyncMock();
  } catch (error) {
    expect(error.message).toBe("error");
  }
});
