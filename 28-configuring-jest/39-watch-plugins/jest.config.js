module.exports = {
  watchPlugins: [
    [
      "./custom-watch-plugin",
      {
        key: "k", // <- your custom key
        prompt: "show a custom prompt"
      }
    ]
  ],
  watchPathIgnorePatterns: ["<rootDir>/ignore-me.test.js"]
};
