import {
    AddUserInput,
    IRegisterUserCase,
    UserLogged,
} from '../../core/use-cases/register-user';
import { RequiredError } from '../../../../errors/required';
import { EmailValidator } from '../../../../ports/validation/validators/email.validator';
import { EmailAddress } from '../../../../value-objects/email/email';
import { InvalidFormatError } from '../../../../errors/invalid-format';
import { nameof } from '../../../../../shared/utils/functions';
import {
    FindUserByEmail,
    PersistUser,
} from '../../core/repositories/user.repository';
import { ConflictError } from '../../../../errors/conflict';
import { HashManager } from '../../../../ports/hash-manager/hash-manager';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';
import { inject, injectable } from 'inversify';

@injectable()
export class RegisterUserCase implements IRegisterUserCase {
    constructor(
        @inject(TYPES.EmailValidator)
        private emailValidator: EmailValidator,
        @inject(TYPES.FindUserByEmail)
        private findUser: FindUserByEmail,
        @inject(TYPES.PersistUser) private persistUser: PersistUser,
        @inject(TYPES.HashManager) private hashManager: HashManager
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

        const user = await this.findUser.findByEmail(email.value);

        if (user) {
            throw new ConflictError('user', nameof<AddUserInput>('email'));
        }

        const userToPersist: AddUserInput = {
            ...input,
            password: await this.hashManager.generate(input.password),
        };

        const userId = await this.persistUser.persist(userToPersist);

        return { ...input, id: userId };
    }
}
