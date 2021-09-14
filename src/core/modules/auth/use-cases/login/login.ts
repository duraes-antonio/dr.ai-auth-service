import {
    ILoginCredentialsCase,
    LoginCredentialsInput,
} from '../../core/use-cases/login';
import { TokenGeneratorWrapper } from '../../../../../main/ports/token/token-generator';
import { FindUserByEmail } from '../../../user/core/repositories/user.repository';
import { UserLogged } from '../../../user/core/use-cases/register-user';
import { HashComparator } from '../../../../../main/ports/hash-manager/hash-manager';
import { NotFoundError } from '../../../../errors/not-found';

export class LoginCredentialsCase implements ILoginCredentialsCase {
    constructor(
        private readonly tokenGenerator: TokenGeneratorWrapper,
        private readonly findUserByEmail: FindUserByEmail,
        private readonly hashComparator: HashComparator
    ) {}

    async execute(input?: LoginCredentialsInput): Promise<string> {
        const userByEmail = await this.findUserByEmail(input.username);

        if (!userByEmail) {
            this.throwNotFound();
        }

        const { password, ...user } = userByEmail;

        const passwordMatch = await this.hashComparator(
            password,
            input.password
        );

        if (!passwordMatch) {
            this.throwNotFound();
        }

        const tokenData: UserLogged = { ...user, email: input.username };
        return this.tokenGenerator({ data: tokenData });
    }

    throwNotFound(): void {
        throw new NotFoundError('user');
    }
}
