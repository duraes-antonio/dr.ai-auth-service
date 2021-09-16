import { FormatError, Validatable } from '../../ports/validation/validation';
import { EmailValidator } from '../../ports/validation/validators/email.validator';

class EmailAddress implements Validatable<string> {
    readonly valid: boolean;
    readonly value: string;

    constructor(
        private readonly validator: EmailValidator,
        private readonly rawValue: string,
        private readonly maxLength = 64
    ) {
        this.valid = !this.validate(rawValue);
        this.value = rawValue;
    }

    validate(value: string): FormatError[] | undefined {
        const { maxLength } = this;
        return this.validator({ value, maxLength });
    }
}

export { EmailAddress };
