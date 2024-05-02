export type id = string;
export type name = string;
export type actor = [id, name] | {
    id: id;
    name: name;
};
export type pathway = actor[];
