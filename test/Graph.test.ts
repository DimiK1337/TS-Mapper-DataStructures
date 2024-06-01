import { Utilities } from "utilities";

// When benchmarking, ensure you use `structuredClone` before passing in nodes
import { Benchmark } from "./Benchmark.js";

import { NodeTypes, NodeType } from "types";

import { Graph } from "graph";
describe("Given Graph imported", () => {
  it("then Graph exist", () => {
    expect(Graph).toBeDefined();
  });
});

import { Object } from "object";
describe("Given graph = new Graph(Object)", () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(Object);
  });
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.node exist", () => {
    expect(graph.node).toBeDefined();
  });
  it("then graph.createNodes exist", () => {
    expect(graph.createNodes).toBeDefined();
  });
  it("then graph.node equals Object", () => {
    expect(graph.node).toBe(Object);
  });
  it("then graph.addNodes exist", () => {
    expect(graph.addNodes).toBeDefined();
  });
  it("then graph.findNodeById exist", () => {
    expect(graph.findNodeById).toBeDefined();
  });
  it("then graph.findNodesByType exist", () => {
    expect(graph.findNodesByType).toBeDefined();
  });
  it("then graph.addNodeMetadata exist", () => {
    expect(graph.addNodeMetadata).toBeDefined();
  });
  it("then graph.moveAllNodes exist", () => {
    expect(graph.moveAllNodes).toBeDefined();
  });
  it("then graph.removeNodeById exist", () => {
    expect(graph.removeNodeById).toBeDefined();
  });
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNode([], details)", () => {
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.addNode([], details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let existingNodes;
    let newNodes;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      newNodes = graph.createNodes(2, {
        name: "Node2",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      nodes = graph.addNodes(existingNodes, newNodes);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(4);
    });
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let node;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      node = graph.findNodeById(existingNodes, id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals existingNodes[1]", () => {
      expect(node).toEqual(existingNodes[1]);
    });
  });
  describe("when nodes = graph.findNodesByType(existingNodes, type)", () => {
    let existingNodes;
    let type;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      existingNodes = graph.addNode(existingNodes, {
        name: "Node2",
        type: "decision",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      type = "workflow";
      nodes = graph.findNodesByType(existingNodes, type);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(2);
    });
  });
  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let existingNodes;
    let id;
    let metadata;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes = graph.addNodeMetadata(existingNodes, id, metadata);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(nodes.length).toBe(2);
    });
    it("then nodes[1].metadata[0] equals metadata", () => {
      expect(nodes[1].metadata[0]).toEqual(metadata);
    });
  });
  describe("when nodes = graph.moveAllNodes(existingNodes, offset)", () => {
    let existingNodes;
    let offset;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      offset = { x: 1, y: 1 };
      nodes = graph.moveAllNodes(existingNodes, offset);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(nodes.length).toBe(2);
    });
    it("then nodes[1].coordinates.x equals 1", () => {
      expect(nodes[1].coordinates.x).toEqual(1);
    });
    it("then nodes[1].coordinates.y equals 1", () => {
      expect(nodes[1].coordinates.y).toEqual(1);
    });
  });
  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1].id;
      nodes = graph.removeNodeById(existingNodes, id);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when benchmarking graph.createNodes function", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    it("then create 1 node takes", () => {
      let qty = 1;
      let nodes = Benchmark.Performance(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1 node consumes", () => {
      let qty = 1;
      let nodes = Benchmark.Memory(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10 node takes", () => {
      let qty = 10;
      let nodes = Benchmark.Performance(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10 node consumes", () => {
      let qty = 10;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 100 node takes", () => {
      let qty = 100;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 100 node consumes", () => {
      let qty = 100;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1000 node takes", () => {
      let qty = 1000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1000 node consumes", () => {
      let qty = 1000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10000 node takes", () => {
      let qty = 10000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10000 node consumes", () => {
      let qty = 10000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
  });
  describe("when benchmarking graph.addNode function", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });

    it("then adding 1 node to nodes takes", () => {
      let meta = { structure: "Object", action: "addNode", after: 0 };
      let results = Benchmark.Performance(meta, graph.addNode, [], details);
      expect(results.length).toEqual(1);
    });
    it("then adding 1 node to nodes consumes", () => {
      let meta = { structure: "Object", action: "addNode", after: 0 };
      let results = Benchmark.Memory(meta, graph.addNode, [], details);
      expect(results.length).toEqual(1);
    });
    it("then adding 1 node to an existing set of 1 nodes takes", () => {
      let nodes = graph.createNodes(1, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 1 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(2);
    });
    it("then adding 1 node to an existing set of 1 nodes consumes", () => {
      let nodes = graph.createNodes(1, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 1 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(2);
    });

    it("then adding 1 node to an existing set of 10 nodes takes", () => {
      let nodes = graph.createNodes(10, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 10 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10);
    });
    it("then adding 1 node to an existing set of 10 nodes consumes", () => {
      let nodes = graph.createNodes(10, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 10 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10);
    });

    it("then adding 1 node to an existing set of 100 nodes takes", () => {
      let nodes = graph.createNodes(100, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 100 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 100);
    });
    it("then adding 1 node to an existing set of 100 nodes consumes", () => {
      let nodes = graph.createNodes(100, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 100 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 100);
    });

    it("then adding 1 node to an existing set of 1000 nodes takes", () => {
      let nodes = graph.createNodes(1000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 1000 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 1000);
    });
    it("then adding 1 node to an existing set of 1000 nodes consumes", () => {
      let nodes = graph.createNodes(1000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 1000 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 1000);
    });

    it("then adding 1 node to an existing set of 10000 nodes takes", () => {
      let nodes = graph.createNodes(10000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 10000 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10000);
    });
    it("then adding 1 node to an existing set of 10000 nodes consumes", () => {
      let nodes = graph.createNodes(10000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Object", action: "addNode", after: 10000 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10000);
    });
  });
  describe("when benchmarking graph.addNodes function", () => {
    let details;
    let nodes;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1000, details);
    });
      it("then adding adding a new set of 1 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 1 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1 + 1000);
      });
      it("then adding adding a new set of 1 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 1 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1 + 1000);
      });

      it("then adding adding a new set of 10 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 10 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10 + 1000);
      });
      it("then adding adding a new set of 10 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 10 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10 + 1000);
      });

      it("then adding a new set of 100 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(100, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 100 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(100 + 1000);
      });
      
      it("then adding a new set of 100 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(100, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 100 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(100 + 1000);
      });
      
      it("then adding a new set of 1000 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 1000 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1000 + 1000);
      });
      
      it("then adding a new set of 1000 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 1000 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1000 + 1000);
      });
      
      it("then adding a new set of 10000 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 10000 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10000 + 1000);
      });
      
      it("then adding a new set of 10000 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Object", action: "addNodes", after: 10000 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10000 + 1000);
      });
  });
  describe("when benchmarking graph.findNodeById function", () => {
    let details;
    let nodes;
    let nodeToFind;
    let id;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(10000, details);
    });

    it("then finding the ID of the node at the 1st position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[0];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 1st position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[0];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 10th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 10th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 100th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[100-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 100th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[100-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 1000th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[1000-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 1000th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[1000-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 10000th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10000-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
    it("then finding the ID of the node at the 10000th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10000-1];
      id = nodeToFind.id;
      let meta = { structure: "Object", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results.id).toEqual(id);
    });
  });

  // TODO: FindByType

  // TODO: AddNodeMetaData

  describe("when benchmarking graph.moveAllNodes", () => {
    let details;
    let nodes;
    let offset;

    let moveNode;

    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      offset = { x: 10, y: 10 };
      moveNode = (node) => ({
          ...node, coordinates: { x: node.coordinates.x + offset.x, y: node.coordinates.y + offset.y }
        });
    });

    it("then moving all nodes by an offset in a set of 1 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(1, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 1 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 1 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(1, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 1 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 10 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(10, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 10 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 10 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(10, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 10 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 100 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(100, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 100 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 100 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(100, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 100 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 1000 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(1000, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 1000 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 1000 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(1000, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 1000 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 10000 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(10000, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 10000 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 10000 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(10000, details));
      let meta = { structure: "Object", action: "moveAllNodes", after: 10000 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });

  });

  describe("when benchmarking graph.removeNodeById", () => {
    let details;
    let nodes;
    let nodeToRemove;
    let id;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(10000, details);
    });

    it("then removing the node at the 1st position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[0];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1st position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[0];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 100th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[100-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 100th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[100-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1000th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[1000-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1000th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[1000-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10000th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10000-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10000th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10000-1];
      id = nodeToRemove.id
      let meta = { structure: "Object", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
  });


});

/**
 * Tuple is below: Find this comment in CTRL + F
 */

import { Tuple } from "tuple";
describe("Given graph = new Graph(Tuple)", () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(Tuple);
  });

  /**
   * Tuple existence tests
   */
  it("then graph exist", () => {
    expect(graph).toBeDefined();
  });
  it("then graph.node exist", () => {
    expect(graph.node).toBeDefined();
  });
  it("then graph.createNodes exist", () => {
    expect(graph.createNodes).toBeDefined();
  });
  it("then graph.node equals Tuple", () => {
    expect(graph.node).toBe(Tuple);
  });
  it("then graph.addNodes exist", () => {
    expect(graph.addNodes).toBeDefined();
  });
  it("then graph.findNodeById exist", () => {
    expect(graph.findNodeById).toBeDefined();
  });
  it("then graph.findNodesByType exist", () => {
    expect(graph.findNodesByType).toBeDefined();
  });
  it("then graph.addNodeMetadata exist", () => {
    expect(graph.addNodeMetadata).toBeDefined();
  });
  it("then graph.moveAllNodes exist", () => {
    expect(graph.moveAllNodes).toBeDefined();
  });
  it("then graph.removeNodeById exist", () => {
    expect(graph.removeNodeById).toBeDefined();
  });

  /**
   * Tuple methods
   */
  describe("when nodes = graph.createNodes(1, details)", () => {
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(1, details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNode([], details)", () => {
    let nodes;
    beforeEach(() => {
      let details = {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.addNode([], details);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when nodes = graph.addNodes(existingNodes, newNodes)", () => {
    let existingNodes;
    let newNodes;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      newNodes = graph.createNodes(2, {
        name: "Node2",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      nodes = graph.addNodes(existingNodes, newNodes);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(4);
    });
  });
  describe("when node = graph.findNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let node;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      node = graph.findNodeById(existingNodes, id);
    });
    it("then node exist", () => {
      expect(node).toBeDefined();
    });
    it("then node equals existingNodes[1]", () => {
      expect(node).toEqual(existingNodes[1]);
    });
  });
  describe("when nodes = graph.findNodesByType(existingNodes, type)", () => {
    let existingNodes;
    let type;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: "workflow",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      existingNodes = graph.addNode(existingNodes, {
        name: "Node2",
        type: "decision",
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      type = "workflow";
      nodes = graph.findNodesByType(existingNodes, type);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 4", () => {
      expect(nodes.length).toBe(2);
    });
  });
  describe("when nodes = graph.addNodeMetadata(existingNodes, id, metadata)", () => {
    let existingNodes;
    let id;
    let metadata;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      metadata = {
        arrival: {
          distribution: "exponential",
          parameters: [{ rate: 1 }],
        },
      };
      nodes = graph.addNodeMetadata(existingNodes, id, metadata);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(nodes.length).toBe(2);
    });
    it("then nodes[1][5][0] equals metadata", () => {
      expect(nodes[1][5][0]).toEqual(metadata);
    });
  });
  describe("when nodes = graph.moveAllNodes(existingNodes, offset)", () => {
    let existingNodes;
    let offset;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      offset = { x: 1, y: 1 };
      nodes = graph.moveAllNodes(existingNodes, offset);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 2", () => {
      expect(nodes.length).toBe(2);
    });
    it("then nodes[1][3][0] equals 1", () => {
      expect(nodes[1][3][0]).toEqual(1);
    });
    it("then nodes[1][3][1] equals 1", () => {
      expect(nodes[1][3][1]).toEqual(1);
    });
  });
  describe("when nodes = graph.removeNodeById(existingNodes, id)", () => {
    let existingNodes;
    let id;
    let nodes;
    beforeEach(() => {
      existingNodes = graph.createNodes(2, {
        name: "Node1",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      });
      id = existingNodes[1][0];
      nodes = graph.removeNodeById(existingNodes, id);
    });
    it("then nodes exist", () => {
      expect(nodes).toBeDefined();
    });
    it("then nodes.length equals 1", () => {
      expect(nodes.length).toBe(1);
    });
  });
  describe("when benchmarking graph.createNodes function", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    it("then create 1 node takes", () => {
      let qty = 1;
      let nodes = Benchmark.Performance(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1 node consumes", () => {
      let qty = 1;
      let nodes = Benchmark.Memory(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10 node takes", () => {
      let qty = 10;
      let nodes = Benchmark.Performance(
        { structure: "Object", action: "createNodes", qty: qty },
        graph.createNodes,
        qty,
        details
      );
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10 node consumes", () => {
      let qty = 10;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 100 node takes", () => {
      let qty = 100;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 100 node consumes", () => {
      let qty = 100;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1000 node takes", () => {
      let qty = 1000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 1000 node consumes", () => {
      let qty = 1000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10000 node takes", () => {
      let qty = 10000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Performance(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
    it("then create 10000 node consumes", () => {
      let qty = 10000;
      let meta = { structure: "Object", action: "createNodes", qty: qty };
      let nodes = Benchmark.Memory(meta, graph.createNodes, qty, details);
      expect(nodes.length).toEqual(qty);
    });
  });
  describe("when benchmarking graph.addNode function", () => {
    let details;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
    });
    it("then adding 1 node to nodes takes", () => {
      let meta = { structure: "Tuple", action: "addNode", after: 0 };
      let results = Benchmark.Performance(meta, graph.addNode, [], details);
      expect(results.length).toEqual(1);
    });
    it("then adding 1 node to nodes consumes", () => {
      let meta = { structure: "Tuple", action: "addNode", after: 0 };
      let results = Benchmark.Memory(meta, graph.addNode, [], details);
      expect(results.length).toEqual(1);
    });
    it("then adding 1 node to an existing set of 1 nodes takes", () => {
      let nodes = graph.createNodes(1, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 1 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(2);
    });
    it("then adding 1 node to an existing set of 1 nodes consumes", () => {
      let nodes = graph.createNodes(1, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 1 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(2);
    });

    it("then adding 1 node to an existing set of 10 nodes takes", () => {
      let nodes = graph.createNodes(10, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 10 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10);
    });
    it("then adding 1 node to an existing set of 10 nodes consumes", () => {
      let nodes = graph.createNodes(10, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 10 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10);
    });

    it("then adding 1 node to an existing set of 100 nodes takes", () => {
      let nodes = graph.createNodes(100, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 100 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 100);
    });
    it("then adding 1 node to an existing set of 100 nodes consumes", () => {
      let nodes = graph.createNodes(100, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 100 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 100);
    });
    it("then adding 1 node to an existing set of 1000 nodes takes", () => {
      let nodes = graph.createNodes(1000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 1000 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 1000);
    });
    it("then adding 1 node to an existing set of 1000 nodes consumes", () => {
      let nodes = graph.createNodes(1000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 1000 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 1000);
    });

    it("then adding 1 node to an existing set of 10000 nodes takes", () => {
      let nodes = graph.createNodes(10000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 10000 };
      let results = Benchmark.Performance(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10000);
    });
    it("then adding 1 node to an existing set of 10000 nodes consumes", () => {
      let nodes = graph.createNodes(10000, details);
      nodes = structuredClone(nodes);
      let meta = { structure: "Tuple", action: "addNode", after: 10000 };
      let results = Benchmark.Memory(meta, graph.addNode, nodes, details);
      expect(results.length).toEqual(1 + 10000);
    });
  });
  describe("when benchmarking graph.addNodes function", () => {
    let details;
    let nodes;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };

      nodes = graph.createNodes(1000, details);
    });

      it("then adding adding a new set of 1 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 1 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1 + 1000);
      });
      it("then adding adding a new set of 1 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 1 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1 + 1000);
      });

      it("then adding adding a new set of 10 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 10 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10 + 1000);
      });
      it("then adding adding a new set of 10 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 10 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10 + 1000);
      });

      it("then adding a new set of 100 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(100, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 100 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(100 + 1000);
      });
      
      it("then adding a new set of 100 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(100, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 100 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(100 + 1000);
      });
      
      it("then adding a new set of 1000 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 1000 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1000 + 1000);
      });
      
      it("then adding a new set of 1000 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(1000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 1000 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(1000 + 1000);
      });
      
      it("then adding a new set of 10000 nodes to an existing set of 1000 nodes takes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 10000 };
        let results = Benchmark.Performance(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10000 + 1000);
      });
      
      it("then adding a new set of 10000 nodes to an existing set of 1000 nodes consumes", () => {
        nodes = structuredClone(nodes);
        let newNodes = graph.createNodes(10000, details);
        newNodes = structuredClone(newNodes);
        let meta = { structure: "Tuple", action: "addNodes", after: 10000 };
        let results = Benchmark.Memory(meta, graph.addNodes, nodes, newNodes);
        expect(results.length).toEqual(10000 + 1000);
      });
  });
  describe("when benchmarking graph.findNodeById function", () => {
    let details;
    let nodes;
    let nodeToFind;
    let id;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(10000, details);
    });

    it("then finding the ID of the node at the 1st position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[0];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 1st position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[0];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 10th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 10th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 100th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[100-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 100th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[100-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 1000th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[1000-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 1000th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[1000-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 10000th position takes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10000-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
    it("then finding the ID of the node at the 10000th position consumes", () => {
      nodes = structuredClone(nodes);
      nodeToFind = nodes[10000-1];
      id = nodeToFind[0]
      let meta = { structure: "Tuple", action: "findNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.findNodeById, nodes, id);
      expect(results[0]).toEqual(id);
    });
  });

  // TODO: FindNodesByType

  // TODO: AddNodeMetaData

  describe("when benchmarking graph.moveAllNodes", () => {
    let details;
    let nodes;
    let offset;

    let moveNode;

    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      offset = { x: 10, y: 10 };

      moveNode = (node) => {
        node[3] = [node[3][0] + offset.x, node[3][1] + offset.y];
        return node;
      }
    });

    it("then moving all nodes by an offset in a set of 1 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(1, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 1 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 1 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(1, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 1 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 10 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(10, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 10 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 10 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(10, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 10 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)))
    });
    it("then moving all nodes by an offset in a set of 100 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(100, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 100 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 100 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(100, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 100 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 1000 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(1000, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 1000 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 1000 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(1000, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 1000 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 10000 nodes takes", () => {
      nodes = structuredClone(graph.createNodes(10000, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 10000 };
      let results = Benchmark.Performance(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
    it("then moving all nodes by an offset in a set of 10000 nodes consumes", () => {
      nodes = structuredClone(graph.createNodes(10000, details));
      let meta = { structure: "Tuple", action: "moveAllNodes", after: 10000 };
      let results = Benchmark.Memory(meta, graph.moveAllNodes, nodes, offset);
      expect(results).toEqual(nodes.map(node => moveNode(node)));
    });
  });



  describe("when benchmarking graph.removeNodeById", () => {
    let details;
    let nodes;
    let nodeToRemove;
    let id;
    beforeEach(() => {
      details = {
        name: "Node",
        type: Utilities.getRandomElement<NodeType>(NodeTypes),
        coordinates: { x: 0, y: 0 },
        icon: "./icon.svg",
      };
      nodes = graph.createNodes(10000, details);
    });

    it("then removing the node at the 1st position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[0];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1st position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[0];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 100th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[100-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 100th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[100-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1000th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[1000-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 1000th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[1000-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10000th position by ID takes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10000-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Performance(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
    it("then removing the node at the 10000th position by ID consumes", () => {
      nodes = structuredClone(nodes);
      nodeToRemove = nodes[10000-1];
      id = nodeToRemove[0]
      let meta = { structure: "Tuple", action: "removeNodeById", after: 10000 };
      let results = Benchmark.Memory(meta, graph.removeNodeById, nodes, id);
      expect(results.length).toEqual(nodes.length - 1);
    });
  });




});
