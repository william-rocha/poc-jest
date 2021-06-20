module.exports = {
  collectCoverage: true,
  // collectCoverageFrom: ["./utils-1.js"],
  // coveragePathIgnorePatterns: ["./utils-1.js"],
  coverageDirectory: "coverageCustom",
  // coverageReporters: ["json"]
  // coverageThreshold: {
  // global: {
  //   branches: 90,
  //   functions: 90,
  //   lines: 90,
  //   statements: 90
  // },
  // "./utils-2.js": {
  //   branches: 90,
  //   functions: 90,
  //   lines: 90,
  //   statements: 90
  // },
  forceCoverageMatch: ["**/*.t.js"]
};
