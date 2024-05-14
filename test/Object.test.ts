import { Simulator } from "../src/Simulator.js";
import { Benchmark } from "./Benchmark.js";

describe("Given Object are used", () => {
  describe("when creating 1000 new nodes", () => {
    let simulator: Simulator;
    beforeEach(() => {
      simulator = new Simulator();
    });
    it("then nodes should contain 1000 nodes taking a specific time", () => {
      let output = Benchmark.Performance(() => simulator.generateNodes(1000));
      expect(output.length).toEqual(1000);
    });
    it("then nodes should contain 1000 nodes using a specific size", () => {
      let nodes = Benchmark.Memory(() => simulator.generateNodes(1000));
      expect(nodes.length).toEqual(1000);
    });
  });
});
