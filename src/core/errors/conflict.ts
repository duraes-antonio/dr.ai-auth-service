import { factoryMessageError } from './error-message.factory';

type FactoryMessageConflictError = (
    entityName: string,
    attributeName: string
) => string;

class ConflictError extends Error {
    constructor(
        entityName: string,
        attributeName: string,
        factoryMessage: FactoryMessageConflictError = factoryMessageError.conflict
    ) {
        super(factoryMessage(entityName, attributeName));
    }
}

export { ConflictError, FactoryMessageConflictError };
