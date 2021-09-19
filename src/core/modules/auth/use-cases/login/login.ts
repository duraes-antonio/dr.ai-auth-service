import {
    ILoginCredentialsCase,
    LoginCredentialsInput,
} from '../../core/use-cases/login';
import { TokenGeneratorWrapper } from '../../../../ports/token/token-generator';
import { UserLogged } from '../../../user/core/use-cases/register-user';
import { NotFoundError } from '../../../../errors/not-found';
import { RequiredError } from '../../../../errors/required';
import { HashManager } from '../../../../ports/hash-manager/hash-manager';
import { FindUserByEmail } from '../../../user/core/repositories/user.repository';

export class LoginCredentialsCase implements ILoginCredentialsCase {
    constructor(
        private readonly tokenGenerator: TokenGeneratorWrapper,
        private readonly findUserByEmail: FindUserByEmail,
        private readonly hashManager: HashManager
    ) {}

    async execute(input: LoginCredentialsInput): Promise<string> {
        if (!input) {
            throw new RequiredError('credentials');
        }

        const userByEmail = await this.findUserByEmail.findByEmail(
            input.username
        );

        if (!userByEmail) {
            this.throwNotFound();
        }

        const { password, ...user } = userByEmail;

        const passwordMatch = await this.hashManager.compare(
            password,
            input.password
        );

        if (!passwordMatch) {
            this.throwNotFound();
        }

        const tokenData: UserLogged = { ...user, email: input.username };
        return this.tokenGenerator({ data: tokenData });
    }

    throwNotFound(): never {
        throw new NotFoundError('user');
    }
}
