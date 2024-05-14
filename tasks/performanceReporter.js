const fs = require("fs");
const path = require("path");

function performanceReporter(config) {
  var results = [];
  var dir = "";

  this.createReportDirectory = () => {
    dir = config?.performanceReporter?.dir ?? "./output";
    fs.mkdirSync(dir, { recursive: true });
    return this;
  };
  this.writeReportToFile = () => {
    let filename =
      config?.performanceReporter?.filename ?? "performance.report.json";
    let filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
  };

  this.onRunComplete = (browsers, result) => {
    this.createReportDirectory().writeReportToFile();
  };

  this.onSpecComplete = (browser, result) => {
    if (result.properties != null) {
      let output = {
        spec: result.fullName,
        measurement: result.properties,
      };
      results.push(output);
    }
  };
}

performanceReporter.$inject = ["config"];

module.exports = {
  "reporter:performance": ["type", performanceReporter],
};
