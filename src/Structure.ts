import { Node, id, name, x, y } from "./Types.js";

export class Structure {
  static create = (tuple: boolean, id: id, name: name, x: x, y: y): Node =>
    tuple ? [id, name, x, y] : { id, name, x, y };
}
