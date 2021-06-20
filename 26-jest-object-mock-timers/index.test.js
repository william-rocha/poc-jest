beforeEach(() => {
  jest.useFakeTimers();
});

test("useFakeTimers", () => {
  expect(jest.isMockFunction(setTimeout)).toBe(true);
  expect(jest.isMockFunction(setInterval)).toBe(true);
  expect(jest.isMockFunction(clearTimeout)).toBe(true);
  expect(jest.isMockFunction(clearInterval)).toBe(true);
  expect(jest.isMockFunction(process.nextTick)).toBe(true);
  expect(jest.isMockFunction(setImmediate)).toBe(true);
  expect(jest.isMockFunction(clearImmediate)).toBe(true);
});

test("useRealTimers", () => {
  jest.useRealTimers();

  expect(jest.isMockFunction(setTimeout)).toBe(false);
  expect(jest.isMockFunction(setInterval)).toBe(false);
  expect(jest.isMockFunction(clearTimeout)).toBe(false);
  expect(jest.isMockFunction(clearInterval)).toBe(false);
  expect(jest.isMockFunction(process.nextTick)).toBe(false);
  expect(jest.isMockFunction(setImmediate)).toBe(false);
  expect(jest.isMockFunction(clearImmediate)).toBe(false);
});

test("runsAllTicks", () => {
  const tickerRunner = (currentTime = 1) => {
    console.log(`Running 'runsAllTicks' for the ${currentTime}.`);

    if (currentTime === 3) {
      return;
    }

    process.nextTick(() => {
      tickerRunner(currentTime + 1);
    });
  };

  tickerRunner();

  jest.runAllTicks();
});

test("runAllTimers", () => {
  const tickerRunner = (currentTime = 1) => {
    console.log(`Running 'runAllTimers' for the ${currentTime}.`);

    if (currentTime === 3) {
      return;
    }

    process.nextTick(() => {
      tickerRunner(currentTime + 1);
    });
  };

  setTimeout(() => {
    console.log(`Starting 'runAllTimers'...`);
    tickerRunner();
  }, 1000);

  jest.runAllTimers();
});

test("runAllImmediate", () => {
  const immediateRunner = (currentTime = 1) => {
    console.log(`Running 'runAllImmediate' for the ${currentTime}.`);

    if (currentTime === 3) {
      return;
    }

    setImmediate(() => {
      immediateRunner(currentTime + 1);
    });
  };

  immediateRunner();

  jest.runAllImmediates();
});

test("advanceTimersByTime", () => {
  setTimeout(() => {
    console.log("10ms");

    setTimeout(() => {
      console.log("10ms + 20ms");
    }, 20);
  }, 10);

  // jest.advanceTimersByTime(30);
  jest.runTimersToTime(30);
});

test("runOnlyPendingTimers", () => {
  setTimeout(() => {
    console.log("1 - runOnlyPendingTimers");

    setTimeout(() => {
      console.log("2 - runOnlyPendingTimers");
    }, 20);
  }, 10);

  jest.runOnlyPendingTimers();

  jest.runOnlyPendingTimers();
});

test("clearAllTimers", () => {
  setTimeout(() => {
    console.log("1 - clearAllTimers");

    setTimeout(() => {
      console.log("2 - clearAllTimers");
    }, 20);
  }, 10);

  jest.runOnlyPendingTimers();
  jest.clearAllTimers();
  jest.runOnlyPendingTimers();
});

test("getTimerCount", () => {
  setTimeout(() => {
    console.log("1 - getTimerCount");

    setTimeout(() => {
      console.log("2 - getTimerCount");
    }, 20);
  }, 10);

  setTimeout(() => {
    console.log("3 - getTimerCount");
  }, 10);

  expect(jest.getTimerCount()).toBe(2);
  jest.runOnlyPendingTimers();
  expect(jest.getTimerCount()).toBe(1);
  jest.runOnlyPendingTimers();
  expect(jest.getTimerCount()).toBe(0);
});
