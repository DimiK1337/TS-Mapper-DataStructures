export type id = string;
export type name = string;
export type x = number;
export type y = number;
export type node = [id, name, x, y] | { id: id; name: name; x: x; y: y };
export type graph = node[];
