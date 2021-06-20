test("snapshot-serializer", () => {
  expect({
    foo: "bar"
  }).toMatchInlineSnapshot(`Pretty foo: "bar"`);
});
