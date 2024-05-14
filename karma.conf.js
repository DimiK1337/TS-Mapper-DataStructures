const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      { pattern: "./src/**/*.js", type: "module" },
      { pattern: "./test/**/*.js", type: "module" },
    ],
    preprocessors: {
      "src/**/!(*.test).js": ["karma-coverage-istanbul-instrumenter"],
    },
    plugins: ["karma-*", require("./tasks/performanceReporter.js")],
    reporters: ["spec", "coverage-istanbul", "performance"],
    performanceReporter: {
      dir: "./output",
      filename: "performance.report.json",
    },
    coverageIstanbulInstrumenter: {
      esModules: true,
    },
    coverageIstanbulReporter: {
      reports: ["html", "text", "lcovonly"],
      dir: path.join(__dirname, "coverage"),
      skipFilesWithNoCoverage: true,
    },
    customLaunchers: {
      Chrome_with_memory: {
        base: "Chrome",
        flags: ["--enable-precise-memory-info"],
      },
    },
    browsers: ["Chrome_with_memory"],
    singleRun: true,
    logLevel: config.DISABLE_LOG,
  });
};
