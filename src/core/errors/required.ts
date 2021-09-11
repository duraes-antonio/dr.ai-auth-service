import {factoryMessageError} from './error-message.factory';

export type FactoryMessageRequired = (attributeName: string) => string;

export class RequiredError extends Error {
	constructor(
		attributeName: string,
		factoryMessage: FactoryMessageRequired = factoryMessageError.required
	) {
		super(factoryMessage(attributeName));
	}
}
