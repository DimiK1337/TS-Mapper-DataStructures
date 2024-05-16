import { Node, Graph } from "../src/Types.js";

export class Simulator {
  private nodes: Graph = [];

  generateNodes(count: number, newNode): Node[] {
    for (let i = 0; i < count; i++) {
      let node = newNode();
      this.nodes.push(node);
    }
    return this.nodes;
  }

  // TODO: Implement similar method to findNodes as done when creating a new Node
  findNodeById(id: string): Node | undefined {
    return this.nodes.find((node: any) => node.id === id);
  }

  // TODO: Implement all Operations as described in the README
}
