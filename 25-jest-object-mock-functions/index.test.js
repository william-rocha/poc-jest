test("fn", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();

  const returnsTrue = jest.fn(() => true);
  expect(returnsTrue()).toBe(true);
});

test("isMockFunction", () => {
  function common() {
    return true;
  }

  const mockFn = jest.fn();

  expect(jest.isMockFunction(common)).toBe(false);
  expect(jest.isMockFunction(mockFn)).toBe(true);
});

test("spyOn", () => {
  const video = {
    play() {
      return true;
    }
  };

  const spy = jest.spyOn(video, "play");
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  expect(jest.isMockFunction(video.play)).toBe(true);

  spy.mockRestore();

  expect(jest.isMockFunction(video.play)).toBe(false);
});

test("spyOn accessType", () => {
  const video = {
    // it's a getter!
    get play() {
      return true;
    }
  };

  const audio = {
    _volume: false,
    // it's a setter!
    set volume(value) {
      this._volume = value;
    },
    get volume() {
      return this._volume;
    }
  };

  let spy = jest.spyOn(video, "play", "get"); // we pass 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);

  spy.mockRestore();

  spy = jest.spyOn(audio, "volume", "set"); // we pass 'set'
  audio.volume = 100;

  expect(spy).toHaveBeenCalled();
  expect(audio.volume).toBe(100);

  spy.mockRestore();
});

test("clearAllMocks", () => {
  const mockFn1 = jest.fn(() => 42);
  const mockFn2 = jest.fn();

  expect(mockFn1()).toBe(42);
  mockFn2();

  expect(mockFn1).toHaveBeenCalled();
  expect(mockFn2).toHaveBeenCalled();

  jest.clearAllMocks();

  expect(mockFn1).not.toHaveBeenCalled();
  expect(mockFn2).not.toHaveBeenCalled();

  expect(mockFn1()).toBe(42);
});

test("resetAllMocks", () => {
  const mockFn1 = jest.fn(() => 42);
  const mockFn2 = jest.fn();

  expect(mockFn1()).toBe(42);
  mockFn2();

  expect(mockFn1).toHaveBeenCalled();
  expect(mockFn2).toHaveBeenCalled();

  jest.resetAllMocks();

  expect(mockFn1).not.toHaveBeenCalled();
  expect(mockFn2).not.toHaveBeenCalled();

  expect(mockFn1()).toBeUndefined();
});

test("restoreAllMocks", () => {
  const video = {
    play() {
      return true;
    }
  };

  const audio = {
    increaseVolume() {
      return true;
    }
  };

  jest.spyOn(video, "play");
  jest.spyOn(audio, "increaseVolume");

  expect(jest.isMockFunction(video.play)).toBe(true);
  expect(jest.isMockFunction(audio.increaseVolume)).toBe(true);

  jest.restoreAllMocks();

  expect(jest.isMockFunction(video.play)).toBe(false);
  expect(jest.isMockFunction(audio.increaseVolume)).toBe(false);
});
