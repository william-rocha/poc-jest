test("anything", () => {
  expect(1).toEqual(expect.anything());
});

test("any", () => {
  expect(1).toEqual(expect.any(Number));
});

test("arrayContaining", () => {
  expect(["a", "b"]).toEqual(expect.arrayContaining(["a"]));
});

test("assertions", async () => {
  expect.assertions(2);
  try {
    await Promise.reject(new Error("error"));
  } catch (error) {
    expect(error).toBeDefined();
    expect(error.message).toBe("error");
  }
});

test("assertions", async () => {
  expect.hasAssertions();
  try {
    await Promise.reject(new Error("error"));
  } catch (error) {
    expect(error.message).toBe("error");
  }
});

test("not.arrayContaining", () => {
  const expected = ["Samantha", "Eve"];

  expect(["Alice", "Bob", "Eve"]).toEqual(expect.not.arrayContaining(expected));
});

test("objectContaining", () => {
  expect({ a: 1, b: 2 }).toEqual(
    expect.objectContaining({ a: expect.any(Number) })
  );

  expect({ a: 1, b: 2, c: "c" }).toEqual(
    expect.not.objectContaining({ c: expect.any(Number) })
  );
});

test("stringContaining", () => {
  expect("ScaffoldHub").toEqual(expect.stringContaining("Scaffold"));
  expect("ScaffoldHub").toEqual(expect.not.stringContaining("Google"));
});

test("stringMatching", () => {
  expect("ScaffoldHub").toEqual(expect.stringMatching(/Scaffold/));
  expect("ScaffoldHub").toEqual(expect.not.stringMatching(/Google/));
});

test("addSnapshotSerializer", () => {
  const customSerializer = {
    print(val, serialize, indent) {
      return "Pretty foo: " + serialize(val.foo);
    },

    test(val) {
      return val && val.hasOwnProperty("foo");
    }
  };

  expect.addSnapshotSerializer(customSerializer);

  expect({
    foo: "bar"
  }).toMatchInlineSnapshot(`Pretty foo: "bar"`);
});

test("resolves", () => {
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

test("rejects", () => {
  return expect(Promise.reject("lemon")).rejects.toBe("lemon");
});

test("toBe", () => {
  expect(1).toBe(1);
  expect({ a: "a" }).not.toBe({ a: "a" });
  expect(0.1 + 0.2).not.toBe(0.3);
});

test("toHaveBeenCalled", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});

test("toHaveBeenCalledTimes", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(3);
});

test("toHaveBeenCalledWith", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledWith(1);
});

test("toHaveBeenLastCalledWith", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn();
  mockFn(1);
  expect(mockFn).toHaveBeenLastCalledWith(1);
});

test("toHaveBeenNthCalledWith", () => {
  const mockFn = jest.fn();
  mockFn();
  mockFn(1, 2);
  mockFn();
  expect(mockFn).toHaveBeenNthCalledWith(2, 1, 2);
});

test("toHaveReturned", () => {
  const mockFn = jest.fn(ok => {
    if (ok) {
      return;
    }

    throw new Error("error");
  });

  try {
    mockFn(true);
    mockFn();
    mockFn();
  } catch (error) {
    // ignore
  }

  expect(mockFn).toHaveReturned();
});

test("toHaveReturnedTimes", () => {
  const mockFn = jest.fn(ok => {
    if (ok) {
      return;
    }

    throw new Error("error");
  });

  try {
    mockFn(true);
    mockFn(true);
    mockFn();
  } catch (error) {
    // ignore
  }

  expect(mockFn).toHaveReturnedTimes(2);
});

test("toHaveReturnedWith", () => {
  const mockFn = jest.fn(arg => {
    return "R" + arg;
  });

  mockFn(1);
  mockFn(2);
  mockFn(3);

  expect(mockFn).toHaveReturnedWith("R2");
});

test("toHaveLastReturnedWith", () => {
  const mockFn = jest.fn(arg => {
    return "R" + arg;
  });

  mockFn(1);
  mockFn(2);
  mockFn(3);

  expect(mockFn).toHaveLastReturnedWith("R3");
});

test("toHaveNthReturnedWith", () => {
  const mockFn = jest.fn(arg => {
    return "R" + arg;
  });

  mockFn(1);
  mockFn(2);
  mockFn(3);

  expect(mockFn).toHaveNthReturnedWith(2, "R2");
});

test("toHaveLength", () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect("abc").toHaveLength(3);
  expect({
    length: 3
  }).toHaveLength(3);
  expect("").not.toHaveLength(5);
});

test("toHaveProperty", () => {
  const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      area: 20,
      wallColor: "white",
      "nice.oven": true
    },
    "ceiling.height": 2
  };

  // Simple Referencing
  expect(houseForSale).toHaveProperty("bath");
  expect(houseForSale).toHaveProperty("bedrooms", 4);

  expect(houseForSale).not.toHaveProperty("pool");

  // Deep referencing using dot notation
  expect(houseForSale).toHaveProperty("kitchen.area", 20);
  expect(houseForSale).toHaveProperty("kitchen.amenities", [
    "oven",
    "stove",
    "washer"
  ]);

  expect(houseForSale).not.toHaveProperty("kitchen.open");

  // Deep referencing using an array containing the keyPath
  expect(houseForSale).toHaveProperty(["kitchen", "area"], 20);
  expect(houseForSale).toHaveProperty(
    ["kitchen", "amenities"],
    ["oven", "stove", "washer"]
  );
  expect(houseForSale).toHaveProperty(["kitchen", "amenities", 0], "oven");
  expect(houseForSale).toHaveProperty(["kitchen", "nice.oven"]);
  expect(houseForSale).not.toHaveProperty(["kitchen", "open"]);

  // Referencing keys with dot in the key itself
  expect(houseForSale).toHaveProperty(["ceiling.height"], 2);
});

test("toBeCloseTo", () => {
  expect(0.2 + 0.1).toBeCloseTo(0.3);
  expect(0.441).toBeCloseTo(0.442, 2);
});

test("toBeDefined", () => {
  expect(null).toBeDefined();
  expect(undefined).not.toBeDefined();
});

test("toBeFalsy", () => {
  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect("").toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(NaN).toBeFalsy();
});

test("toBeGreaterThan", () => {
  expect(10).toBeGreaterThan(9);
});

test("toBeGreaterThanOrEqual", () => {
  expect(10).toBeGreaterThanOrEqual(10);
});

test("toBeLessThan", () => {
  expect(9).toBeLessThan(10);
});

test("toBeLessThanOrEqual", () => {
  expect(10).toBeLessThanOrEqual(10);
});

test("toBeInstanceOf", () => {
  class A {}

  expect(new A()).toBeInstanceOf(A);
  expect(() => {}).toBeInstanceOf(Function);
  expect(new A()).not.toBeInstanceOf(Function);
});

test("toBeNull", () => {
  expect(null).toBeNull();
});

test("toBeTruthy", () => {
  expect(true).toBeTruthy();
  expect(1).toBeTruthy();
  expect("a").toBeTruthy();
  expect({}).toBeTruthy();
  expect([]).toBeTruthy();
});

test("toBeUndefined", () => {
  expect(null).not.toBeUndefined();
  expect(undefined).toBeUndefined();
});

test("toBeNaN", () => {
  expect(NaN).toBeNaN();
  expect(Number("A")).toBeNaN();
});

test("toContain", () => {
  expect(["a", "b"]).toContain("a");
  expect([["a"], ["b"]]).not.toContain(["a"]);
});

test("toContainEqual", () => {
  expect(["a", "b"]).toContainEqual("a");
  expect([["a"], ["b"]]).toContainEqual(["a"]);
});

test("toEqual", () => {
  expect(["a", "b"]).toEqual(["a", "b"]);
  expect(["a", "b"]).not.toBe(["a", "b"]);

  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  expect({ a: 1, b: 2 }).not.toBe({ a: 1, b: 2 });
});

test("toMatch", () => {
  expect("ScaffoldHub").toMatch(/Scaffold/);
});

test("toMatchObject", () => {
  const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      area: 20,
      wallColor: "white"
    }
  };
  const desiredHouse = {
    bath: true,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      wallColor: expect.stringMatching(/white|yellow/)
    }
  };

  expect(houseForSale).toMatchObject(desiredHouse);

  expect([{ foo: "bar" }, { baz: 1 }]).toMatchObject([
    { foo: "bar" },
    { baz: 1 }
  ]);

  expect([{ foo: "bar" }, { baz: 1, extra: "quux" }]).toMatchObject([
    { foo: "bar" },
    { baz: 1 }
  ]);
});

test("toMatchSnapshot", () => {
  expect({
    name: "Felipe",
    age: 22
  }).toMatchSnapshot(
    {
      age: expect.any(Number)
    },
    "Person snapshot"
  );
});

test("toMatchInlineSnapshot", () => {
  expect({
    name: "Felipe",
    age: 22
  }).toMatchInlineSnapshot(
    {
      age: expect.any(Number)
    },
    `
        Object {
          "age": Any<Number>,
          "name": "Felipe",
        }
    `
  );
});

test("toStrictEqual", () => {
  expect({ a: undefined, b: 2 }).toEqual({ b: 2 });
  expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 });

  expect([, 1]).toEqual([undefined, 1]);
  expect([, 1]).not.toStrictEqual([undefined, 1]);

  class A {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }
  }

  expect(new A("a", "b")).toEqual({ a: "a", b: "b" });
  expect(new A("a", "b")).not.toStrictEqual({ a: "a", b: "b" });
});

test("toThrow", () => {
  class DestructiveError extends Error {}

  const destructiveFn = () => {
    throw new DestructiveError("Boom");
  };

  expect(destructiveFn).toThrow();
  expect(destructiveFn).toThrow(DestructiveError);
  expect(destructiveFn).toThrow(/oom/);
  expect(destructiveFn).toThrow("Boom");
});

test("toThrowErrorMatchingSnapshot", () => {
  class DestructiveError extends Error {}

  const destructiveFn = () => {
    throw new DestructiveError("Boom");
  };

  expect(destructiveFn).toThrowErrorMatchingSnapshot("Hint");
});

test("toThrowErrorMatchingInlineSnapshot", () => {
  class DestructiveError extends Error {}

  const destructiveFn = () => {
    throw new DestructiveError("Boom");
  };

  expect(destructiveFn).toThrowErrorMatchingInlineSnapshot(`"Boom"`);
});
