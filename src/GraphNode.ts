import { tuple } from "./Tuple.js";
import { object } from "./Object.js";

export type Detail = "small" | "large";
export type Type = "object" | "tuple";

export class GraphNode {
  private type: Type;
  private detail: Detail;
  constructor(type: Type, detail: Detail) {
    this.type = type;
    this.detail = detail;
  }
  public add = () =>
    this.type === "object"
      ? object[this.detail].add()
      : tuple[this.detail].add();
}
