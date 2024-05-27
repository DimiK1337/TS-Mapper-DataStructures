import { Simulator } from "../src/Simulator.js";
import { Benchmark } from "./Benchmark.js";
import { GraphNode } from "../src/GraphNode.js";
import { Detail, Type } from "../src/GraphNode.js";

import { 
  hasKeyValuePair,
  increment_object_x_coordinate
} from "../src/Object.js";

import {
  pick_random_node,
  pick_random_key_value_object,
  executeTestSuite,
} from "./Utils.js";


function testNodeGeneration(size: number, type: Type, detail: Detail) {
  describe(`when adding ${size} new nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
    });
    it(`then the graph should contain ${size} nodes taking a specific time to load into graph`, () => {
      let graph = Benchmark.Performance(() =>
        simulator.addNodes(size, node.add)
      );
      expect(graph.length).toEqual(size);
    });
    it(`then graph should contain ${size} nodes using a specific amount of memory`, () => {
      let graph = Benchmark.Memory(() =>
        simulator.addNodes(size, node.add)
      );
      expect(graph.length).toEqual(size);
    });

  });
}

function testNodeFindAll(size: number, type: Type, detail: Detail) {
  describe(`when finding all nodes in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
    });
    it(`then the graph should contain ${size} nodes taking a specific time to be retrieved from the graph`, () => {
      let found_nodes = Benchmark.Performance(() =>
        simulator.findAllNodes(nodes, node.findAll)
      );
      expect(found_nodes.length).toEqual(size);
      expect(found_nodes).toEqual(nodes);
    });
    it(`then graph should contain ${size} nodes using a specific amount of memory`, () => {
      let found_nodes = Benchmark.Memory(() =>
        simulator.findAllNodes(nodes, node.findAll)
      );
      expect(found_nodes.length).toEqual(size);
      expect(found_nodes).toEqual(nodes);
    });

  });
}

function testNodeFindById(size: number, type: Type, detail: Detail) {
  describe(`when finding a node by id in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let node_to_find;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      node_to_find = pick_random_node(nodes);

    });
    it("then the node Object to find must exist", () => {
      expect(node_to_find).toBeDefined();
    });
    it("then the node Object to find must contain a property id", () => {
      expect(node_to_find.id).toBeDefined();
    });

    it(`then the retrieved node must have the same ID as the node to find, taking up a specific amount of time`, () => {
      let found_node = Benchmark.Performance(() =>
        simulator.findNodeById(nodes, node_to_find.id, node.findById)
      );
      expect(found_node).toBeDefined();
      expect(found_node.id).toEqual(node_to_find.id);
    });
    it(`then the retrieved node must have the same ID as the node to find, using a specific amount of memory`, () => {
      let found_node = Benchmark.Memory(() =>
        simulator.findNodeById(nodes, node_to_find.id, node.findById)
      );
      expect(found_node).toBeDefined();
      expect(found_node.id).toEqual(node_to_find.id);
    });

  });
}

function testNodeFindWhere(size: number, type: Type, detail: Detail) {
  describe(`when finding all nodes in a graph of ${size} on the condition where KEY=VALUE`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let random_node;
    let nodes_to_find;

    let key: string;
    let value;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      random_node = pick_random_node(nodes);
      [key, value] = pick_random_key_value_object(random_node);
      nodes_to_find = nodes.filter((node) => hasKeyValuePair(node, key, value));
    });


    it(`then all the nodes should match the condition, where key=value, taking up a specific amount of time`, () => {
      let found_nodes = Benchmark.Performance(() =>
        simulator.findNodesWhere(nodes, key, value, node.findWhere)
      );
      expect(found_nodes).toEqual(nodes_to_find);
    });
    it(`then all the nodes match the condition, where key=value, using a specific amount of memory`, () => {
      let found_nodes = Benchmark.Memory(() =>
        simulator.findNodesWhere(nodes, key, value, node.findWhere)
      );
      expect(found_nodes).toEqual(nodes_to_find);
    });

  });
}

function testNodeUpdateAll(size: number, type: Type, detail: Detail) {
  describe(`when updating all nodes in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;

    let _small_oject_callback: Function;
    let _large_oject_callback: Function;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);

      _small_oject_callback = node => ({ ...node, x: node.x + 5 });
      _large_oject_callback = node => increment_object_x_coordinate(node, 5);
    });

    it(`then all the nodes should have their x value incremented by 5, taking a specific time`, () => {
      let updated_nodes = Benchmark.Performance(() =>
        simulator.updateAllNodes(nodes, node.updateAll)
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
    });
    it(`then all the nodes should have their x value incremented by 5, using a specific amount of memory`, () => {
      let updated_nodes = Benchmark.Memory(() =>
        simulator.updateAllNodes(nodes, node.updateAll)
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
    });

  });
}

function testNodeUpdateById(size: number, type: Type, detail: Detail) {
  describe(`when updating a node by id in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let node_to_update;

    let _small_oject_callback: Function;
    let _large_oject_callback: Function;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      node_to_update = pick_random_node(nodes);

      _small_oject_callback = node => (node.id === node_to_update.id ? { ...node, x: node.x + 5 } : node);
      _large_oject_callback = node => (node.id === node_to_update.id ? increment_object_x_coordinate(node, 5) : node);
    });

    it(`then the node to update must have it's x coordinate incremented by 5, taking up a specific amount of time`, () => {
      let updated_nodes = Benchmark.Performance(() =>
        simulator.updateNodeById(nodes, node_to_update.id, node.updateById) // Returns all nodes
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
      
    });

    it(`then the node to update must have it's x coordinate incremented by 5, using a specific amount of memory`, () => {
      let updated_nodes = Benchmark.Memory(() =>
        simulator.updateNodeById(nodes, node_to_update.id, node.updateById)
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
    });

  });
}

function testNodeUpdateWhere(size: number, type: Type, detail: Detail) {
  describe(`when updating nodes in a graph of ${size} on the condition where KEY=VALUE`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let random_node;
    let nodes_to_update;
    let nodes_to_not_update;


    let key: string;
    let value;

    let _small_oject_callback: Function;
    let _large_oject_callback: Function;


    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      random_node = pick_random_node(nodes);
      [key, value] = pick_random_key_value_object(random_node);
      nodes_to_update = nodes.filter(node => hasKeyValuePair(node, key, value));
      nodes_to_not_update = nodes.filter(node => !hasKeyValuePair(node, key, value))

      _small_oject_callback = node => hasKeyValuePair(node, key, value) ? { ...node, x: node.x + 5 } : node;
      _large_oject_callback = node => hasKeyValuePair(node, key, value) ? increment_object_x_coordinate(node, 5) : node;
    });


    it(`then all the nodes to update should have their x coordinate incremented by 5, taking up a specific amount of time`, () => {
      let updated_nodes = Benchmark.Performance(() =>
        simulator.updateNodesWhere(nodes, key, value, node.updateWhere)
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
    });

    it(`then all the matching nodes should have their x coordinate incremented by 5, using a specific amount of memory`, () => {
      let updated_nodes = Benchmark.Memory(() =>
        simulator.updateNodesWhere(nodes, key, value, node.updateWhere)
      );
      expect(updated_nodes).toEqual(
        nodes.map(node => detail === "small" ? _small_oject_callback(node) : _large_oject_callback(node))
      );
    });

  });

}

function testNodeDeleteAll(size: number, type: Type, detail: Detail) {
  describe(`when deleting all nodes in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
    });

    it(`then the graph should contain 0 nodes, taking a specific time to delete all nodes`, () => {
      let deleted_nodes = Benchmark.Performance(() =>
        simulator.deleteAllNodes(nodes, node.deleteAll)
      );
      expect(deleted_nodes).toEqual([]);
    });
    it(`then graph should contain 0 nodes, using a specific amount of memory`, () => {
      let deleted_nodes = Benchmark.Memory(() =>
        simulator.deleteAllNodes(nodes, node.deleteAll)
      );
      expect(deleted_nodes).toEqual([]);
    });

  });
}

function testNodeDeleteById(size: number, type: Type, detail: Detail) {
  describe(`when deleting a node by id in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let node_to_delete;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      node_to_delete = pick_random_node(nodes);
    });

    it(`then the graph should contain ${size - 1} nodes, taking a specific time to delete the node`, () => {
      let deleted_nodes = Benchmark.Performance(() =>
        simulator.deleteNodeById(nodes, node_to_delete.id, node.deleteById)
      );
      expect(deleted_nodes.length).toEqual(size - 1);
      expect(deleted_nodes).not.toContain(node_to_delete);
    });
    it(`then graph should contain ${size - 1} nodes, using a specific amount of memory`, () => {
      let deleted_nodes = Benchmark.Memory(() =>
        simulator.deleteNodeById(nodes, node_to_delete.id, node.deleteById)
      );
      expect(deleted_nodes.length).toEqual(size - 1);
      expect(deleted_nodes).not.toContain(node_to_delete);
    });

  });
}

function testNodeDeleteWhere(size: number, type: Type, detail: Detail) {
  describe(`when deleting nodes in a graph of ${size} nodes on the condition where KEY=VALUE `, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let random_node;
    let nodes_to_delete;
    let expected_remaining_nodes;

    let key: string;
    let value;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      random_node = pick_random_node(nodes);
      [key, value] = pick_random_key_value_object(random_node);
      //nodes_to_delete = nodes.filter(node => hasKeyValuePair(node, key, value));
      expected_remaining_nodes = nodes.filter(node => !hasKeyValuePair(node, key, value));
      
    });
    it(`then all the nodes matching the condition should be removed, taking up a specific amount of time`, () => {
      let deleted_nodes = Benchmark.Performance(() =>
        simulator.deleteNodesWhere(nodes, key, value, node.deleteWhere)
      );

      // Find all the nodes that match K=V, if any appear in the deleted_nodes -> Fail
      // for (let node of nodes_to_delete) {
      //   expect(deleted_nodes).not.toContain(node);
      // }
      expect(deleted_nodes).toEqual(expected_remaining_nodes);

      // deleted_nodes should contain all the nodes that do not match K=V
    });

    it(`then all the nodes matching the condition should be removed, using a specific amount of memory`, () => {
      let deleted_nodes = Benchmark.Memory(() =>
        simulator.deleteNodesWhere(nodes, key, value, node.deleteWhere)
      );
      // Find all the nodes that match K=V, if any appear in the deleted_nodes -> Fail
      // for (let node of nodes_to_delete) {
      //   expect(deleted_nodes).not.toContain(node);
      // }
      expect(deleted_nodes).toEqual(expected_remaining_nodes);
    });
  });
}

function testHasKeyValuePair(size: number, type: Type, detail: Detail) {
  
  describe(`When searching for nodes in a graph of ${size} nodes`, () => {
    let node: GraphNode;
    let simulator: Simulator;
    let nodes;
    let random_node;
    let key;
    let value;

    beforeEach(() => {
      node = new GraphNode(type, detail);
      simulator = new Simulator();
      nodes = simulator.addNodes(size, node.add);
      random_node = pick_random_node(nodes);
      [key, value] = pick_random_key_value_object(random_node);
    });

    it(`then the method hasKeyPairValue should be defined`, () => {
      expect(hasKeyValuePair).toBeDefined();
    });

    it(`then the method hasKeyPairValue should return true if the key-value pair exists in the graph`, () => {
      expect(hasKeyValuePair(random_node, key, value)).toBeTruthy();
    });

    it(`then the method hasKeyPairValue should return false if the key-value pair does not exist in the graph`, () => {
      expect(hasKeyValuePair(random_node, key, value + 1)).toBeFalsy();
    });

    it(`then the method should recurse upon getting a nested object`, () => {
      const nested_object = { x: { y: { z: 5 } } };
      expect(hasKeyValuePair(nested_object, "z", 5)).toBeTruthy();
    });

  });
  
}

function executeObjectTestSuite(detail: Detail) {
  const test_suite_functions = {

    // "hasKeyValuePair": testHasKeyValuePair,

    "generation": testNodeGeneration,

    "find_all": testNodeFindAll,
    "find_by_id": testNodeFindById,
    "find_where": testNodeFindWhere,

    "update_all": testNodeUpdateAll,
    "update_by_id": testNodeUpdateById,
    "update_where": testNodeUpdateWhere,

    "delete_all": testNodeDeleteAll,
    "delete_by_id": testNodeDeleteById,
    "delete_where": testNodeDeleteWhere,
  };

  describe(`and the Data Structure is ${detail}`, () => {
    for (const [key, func_name] of Object.entries(test_suite_functions)) {
      executeTestSuite(func_name, ...["object", detail]);
    }
  });

}


describe("Given Object Data Structure is used", () => {
  executeObjectTestSuite("small");
  executeObjectTestSuite("large");
});
