import {
    AddUserInput,
    IRegisterUserCase,
    UserLogged,
} from '../../core/use-cases/register-user';
import { RequiredError } from '../../../../errors/required';
import { EmailValidator } from '../../../../contracts/validation/validators/email.validator';
import { EmailAddress } from '../../../../value-objects/emai/email';
import { InvalidFormatError } from '../../../../errors/invalid-format';
import { nameof } from '../../../../../shared/utils/functions';
import {
    FindUserByEmail,
    PersistUser,
} from '../../core/repositories/user.repository';
import { ConflictError } from '../../../../errors/conflict';
import { HashGenerator } from '../../../../../main/ports/hash-manager/hash-manager';

class RegisterUserCase implements IRegisterUserCase {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly findUser: FindUserByEmail,
        private readonly persistUser: PersistUser,
        private readonly hashGenerator: HashGenerator
    ) {}

    async execute(input: AddUserInput): Promise<UserLogged> {
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

        const user = await this.findUser(email.value);

        if (user) {
            throw new ConflictError('user', nameof<AddUserInput>('email'));
        }

        const userToPersist: AddUserInput = {
            ...input,
            password: await this.hashGenerator(input.password),
        };

        const userId = await this.persistUser(userToPersist);

        return { ...input, id: userId };
    }
}

export { RegisterUserCase };
