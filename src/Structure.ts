import { node, id, name, x, y } from "./Types.js";

export class Structure {
  static create = (tuple: boolean, id: id, name: name, x: x, y: y): node =>
    tuple ? [id, name, x, y] : { id, name, x, y };
}
