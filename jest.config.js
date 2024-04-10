export default {
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.js",
    "**/*.test.js",
    "**/*.spec.js",
    "**/*.steps.js",
  ],
  moduleFileExtensions: ["js", "json", "mjs"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
};
