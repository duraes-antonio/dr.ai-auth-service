import { FormatError, Validatable } from '../../ports/validation/validation';
import { EmailValidator } from '../../ports/validation/validators/email.validator';
import { inject } from 'inversify';
import { TYPES } from '../../../main/config/dependency-injection/inversify/di-types';

class EmailAddress implements Validatable<string> {
    readonly valid: boolean;
    readonly value: string;

    constructor(
        @inject(TYPES.EmailValidator)
        private validator: EmailValidator,
        private rawValue: string,
        private maxLength = 64
    ) {
        this.valid = !this.validate(rawValue);
        this.value = rawValue;
    }

    validate(value: string): FormatError[] | undefined {
        const { maxLength } = this;
        return this.validator.validate({ value, maxLength });
    }
}

export { EmailAddress };
