import { GraphNode } from "../src/GraphNode.js";

describe("Given GraphNode is imported", () => {
  it("then GraphNode should be defined", () => {
    expect(GraphNode).toBeDefined();
  });
  describe("Given new GraphNode called node is instantiated", () => {
    let node: GraphNode;
    beforeEach(() => {
      node = new GraphNode("object", "small");
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node should contains private property type", () => {
      expect(node["type"]).toBeDefined();
    });
    it("then node should contains property type with value object", () => {
      expect(node["type"]).toEqual("object");
    });
    it("then node should contain a method called add", () => {
      expect(node.add).toBeDefined();
    });
    describe("when node.create() is called", () => {
      let newNode;
      beforeEach(() => {
        newNode = node.add();
      });
      it("then a node of type object is returned", () => {
        expect(typeof newNode).toEqual("object");
      });
      it("then the node should contain a property id", () => {
        expect(newNode?.id).toBeDefined();
      });
      it("then the node should contain a property name", () => {
        expect(newNode?.name).toBeDefined();
      });
      it("then the node should contain a property x", () => {
        expect(newNode?.x).toBeDefined();
      });
      it("then the node should contain a property y", () => {
        expect(newNode?.y).toBeDefined();
      });
    });
  });
});
