const SoundPlayer = require("../sound-player");
const SoundPlayerConsumer = require("../sound-player-consumer");
jest.mock("../sound-player", () => {
  return function() {
    return { playSoundFile: () => {} };
  };
}); // SoundPlayer is now a mock constructor

it("shows console log", () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
});
