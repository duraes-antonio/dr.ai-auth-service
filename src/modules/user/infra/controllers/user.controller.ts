import {
    AddUserInput,
    IRegisterUserCase,
} from '../../core/use-cases/register-user';
import { TokenGenerator } from '../../../../ports/token/token';
import {
    IUpdateUserCase,
    UpdateUserInput,
} from '../../core/use-cases/update-user';

class UserController {
    constructor(
        private readonly registerCase: IRegisterUserCase,
        private readonly updateCase: IUpdateUserCase,
        private readonly tokenGenerator: TokenGenerator
    ) {}

    async register(
        userData: AddUserInput,
        tokenSecretKey: string,
        tokenExpiresIn?: number
    ): Promise<string> {
        const userRegistered = await this.registerCase.execute(userData);
        return await this.tokenGenerator({
            data: userRegistered,
            expiresIn: tokenExpiresIn,
            privateKey: tokenSecretKey,
        });
    }

    async update(input: UpdateUserInput): Promise<void> {
        await this.updateCase.execute(input);
    }
}

export { UserController };
