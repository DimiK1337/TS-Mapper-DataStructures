import { Structure } from "../src/Structure.js";
import { node } from "../src/Types.js";

describe("Given Structure imported", () => {
  it("then Structure should exist", () => {
    expect(Structure).toBeDefined();
  });
  describe("Given Structure Exists", () => {
    it("then Structure should have create static member", () => {
      expect(Structure.create).toBeDefined();
    });
  });
  describe("When Structure.create is called with useTuple = true", () => {
    it("then it should return a tuple", () => {
      let tuple = true;
      let input = Structure.create(tuple, "1", "John", 0, 0);
      let output: node = ["1", "John", 0, 0];
      expect(input).toEqual(output);
    });
  });
  describe("When Structure.create is called with useTuple = false", () => {
    it("then it should return an object", () => {
      let tuple = false;
      let input = Structure.create(tuple, "1", "John", 0, 0);
      let output: node = { id: "1", name: "John", x: 0, y: 0 };
      expect(input).toEqual(output);
    });
  });
});
