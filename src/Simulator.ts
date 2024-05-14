import { node, graph } from "../src/Types.js";

export class Simulator {
  private nodes: graph = [];

  generateNodes(count: number): node[] {
    let nodes: graph = [];
    for (let i = 0; i < count; i++) {
      this.nodes.push({ id: `node${i}`, name: `Node ${i}`, x: i, y: i });
    }
    return this.nodes;
  }

  findNodeById(id: string): node | undefined {
    return this.nodes.find((node: any) => node.id === id);
  }

  // TODO: Implement all Operations
}
