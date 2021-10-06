type EntityId = string;

interface Entity {
    id: EntityId;
}

interface NamedEntity extends Entity {
    name: string;
}

export { EntityId, Entity, NamedEntity };
