export class Structure {
}
Structure.create = (tuple, id, name) => tuple ? [id, name] : { id, name };
