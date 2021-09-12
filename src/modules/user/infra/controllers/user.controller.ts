import { AddUserInput } from '../../core/use-cases/register-user';
import { RegisterUserCase } from '../../application/use-cases/register-user/register-user';
import { TokenGenerator } from '../../../../ports/token/token';
import { UpdateUserInput } from '../../core/use-cases/update-user';

class UserController {
    constructor(
        private readonly useCase: RegisterUserCase,
        private readonly tokenGenerator: TokenGenerator
    ) {}

    async register(
        userData: AddUserInput,
        tokenSecretKey: string,
        tokenExpiresIn?: number
    ): Promise<string> {
        const userRegistered = await this.useCase.execute(userData);
        return await this.tokenGenerator({
            data: userRegistered,
            expiresIn: tokenExpiresIn,
            privateKey: tokenSecretKey,
        });
    }

    async update(input: UpdateUserInput): Promise<void> {}
}

export { UserController };
