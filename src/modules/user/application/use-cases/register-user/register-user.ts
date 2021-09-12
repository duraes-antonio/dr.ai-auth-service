import {
    AddUserInput,
    RegisterUser,
} from '../../../core/use-cases/register-user';
import { RequiredError } from '../../../../../core/errors/required';
import { EmailValidator } from '../../../../../core/contracts/validation/validators/email.validator';
import { EmailAddress } from '../../../../../core/value-objects/emai/email';
import { InvalidFormatError } from '../../../../../core/errors/invalid-format';
import { nameof } from '../../../../../shared/utils/functions';
import {
    FindUserByEmail,
    PersistUser,
} from '../../../core/repositories/user.repository';
import { ConflictError } from '../../../../../core/errors/conflict';
import { HashGenerator } from '../../../../../ports/hash-manager/hash-manager';
import { User } from '../../../core/entities/user.model';

class RegisterUserCase implements RegisterUser {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly findUser: FindUserByEmail,
        private readonly persistUser: PersistUser,
        private readonly hashGenerator: HashGenerator
    ) {}

    async execute(input: AddUserInput | undefined): Promise<User> {
        if (!input) {
            throw new RequiredError('input');
        }

        if (!input.password?.trim()) {
            throw new RequiredError(nameof<AddUserInput>('password'));
        }

        if (!input.email) {
            throw new RequiredError(nameof<AddUserInput>('email'));
        }

        const email = new EmailAddress(this.emailValidator, input.email);
        const emailErrors = email.validate(input.email);

        if (emailErrors?.length) {
            throw new InvalidFormatError(nameof<AddUserInput>('email'));
        }

        const user = this.findUser(email.value);

        if (user) {
            throw new ConflictError('user', nameof<AddUserInput>('email'));
        }

        const userToPersist: AddUserInput = {
            ...input,
            password: await this.hashGenerator(input.password),
        };

        const userId = await this.persistUser(userToPersist);

        return {
            ...input,
            email,
            id: userId,
        };
    }
}

export { RegisterUserCase };
