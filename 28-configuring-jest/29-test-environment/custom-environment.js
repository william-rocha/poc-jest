const NodeEnvironment = require("jest-environment-node");

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    console.log(config.testEnvironmentOptions);
  }

  async setup() {
    console.log("SETUP");
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
