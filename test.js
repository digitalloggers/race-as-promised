/*
 * Authored by Brian Kim:
 * https://github.com/nodejs/node/issues/17469#issuecomment-685216777
 *
 * Adapted to module structure.
 *
 * Adjusted to run for a finite time and perform explicit leak checks.
 */

const raceAsPromised = require("./");
const nativeRace = Promise.race.bind(Promise);

async function randomString(length) {
  await new Promise((resolve) => setTimeout(resolve, 1));
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const iterationCount = 1000;
const stringSize = 10000;

function usageMeaningfullyIncreasing(usages, key) {
  return usages[2][key] - usages[0][key] > 2 * iterationCount * stringSize && usages[2][key] - usages[1][key] > (usages[1][key] - usages[0][key]) / 2
}

function detectLeak(usages) {
  return usageMeaningfullyIncreasing(usages, 'rss') || usageMeaningfullyIncreasing(usages, 'heapUsed')
}

async function run(race) {
  const pending = new Promise(() => {});
  for (let i = 0; i < iterationCount; i++) {
    // We use random strings to prevent string interning.
    // Pass a different length string to see effects on memory usage.
    await race([pending, randomString(stringSize)]);
  }
}

async function test(label, race, expectPass) {
  const usages = [];
  usages.push(process.memoryUsage());
  await run(race);
  usages.push(process.memoryUsage());
  await run(race);
  usages.push(process.memoryUsage());
  const pass = !detectLeak(usages)
  const expectationMet = pass == expectPass
  console.log(`${expectationMet ? "ok" : "ERROR"}: ${label} ${pass ? "passed" : "failed"} the memory leak test`);
  return expectationMet
}

(async function main() {
  // NB: we run the test not expected to leak first
  process.exit(
    await test('race-as-promised', raceAsPromised, true)
    &&
    await test('native Promise.race', nativeRace, false)
    ? 0 : 1
  );
})();
