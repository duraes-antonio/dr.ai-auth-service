interface Entity {
    id: number;
}

interface NamedEntity extends Entity {
    name: string;
}

export { Entity, NamedEntity };
