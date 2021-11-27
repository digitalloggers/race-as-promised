/*
 * Authored by Brian Kim:
 * https://github.com/nodejs/node/issues/17469#issuecomment-685216777
 *
 * Adapted to module structure.
 */

const race = require("./"); // change to Promise.race to see the difference

async function randomString(length) {
  await new Promise((resolve) => setTimeout(resolve, 1));
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

(async function main() {
  let i = 0;
  const pending = new Promise(() => {});
  while (true) {
    // We use random strings to prevent string interning.
    // Pass a different length string to see effects on memory usage.
    await race([pending, randomString(10000)]);
    if (i++ % 1000 === 0) {
      const usage = process.memoryUsage();
      const rss = Math.round(usage.rss / (1024 ** 2) * 100) / 100;
      const heapUsed = Math.round(usage.heapUsed / (1024 ** 2) * 100) / 100;
      console.log(`RSS: ${rss} MiB, Heap Used: ${heapUsed} MiB`);
    }
  }
})();
