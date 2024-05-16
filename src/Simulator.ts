import { node, graph } from "../src/Types.js";

export class Simulator {
  private nodes: graph = [];

  generateNodes(count: number): node[] {
    let nodes: graph = [];
    for (let i = 0; i < count; i++) {
      let idk = { id: `node${i}`, name: `Node ${i}`, x: i, y: i }
      this.nodes.push(idk);
    }
    return this.nodes;
  }

  findNodeById(id: string): node | undefined {
    return this.nodes.find((node: any) => node.id === id);
  }

  // TODO: Implement all Operations


  // Plot Node
  plotNode(node: node): void {
    this.nodes.push(node);
  }

  // Add Node
  addNode(node: node): void {
    this.nodes.push(node);
  }

  // Remove Node
  removeNode(id: string): void {
    this.nodes = this.nodes.filter((node: any) => node.id !== id);
  }

  // Update Specific Node by ID
  updateNode(id: string, updatedNode: node): void {
    this.nodes = this.nodes.map((node: any) =>
      node.id === id ? updatedNode : node
    );
  }
}
