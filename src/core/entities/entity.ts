interface Entity {
    id: string;
}

interface NamedEntity extends Entity {
    name: string;
}

export { Entity, NamedEntity };
