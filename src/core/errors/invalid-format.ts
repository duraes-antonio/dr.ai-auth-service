import {factoryMessageError} from './error-message.factory';
import {FormatError} from '../contracts/validation/validation';

export type FactoryMessageBadFormat = (attributeName: string, example?: string) => string;

export class InvalidFormat extends Error implements FormatError {
	constructor(
		attributeName: string,
		example?: string,
		factoryMessage: FactoryMessageBadFormat = factoryMessageError.invalidFormat
	) {
		super(factoryMessage(attributeName, example));
	}
}

export class InvalidEmail extends InvalidFormat {
	constructor(
		factoryMessage: FactoryMessageBadFormat = factoryMessageError.invalidFormat
	) {
		super(factoryMessage('email', 'maria@email.com'));
	}
}
