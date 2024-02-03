require("jest-extended");
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["./testSetup.js"],
  verbose: true,
  transform: {},
  // globalSetup: "./globalSetup.js",
  // globalTeardown: "./globalTeardown.js",
};
