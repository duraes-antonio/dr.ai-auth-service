import {
    AddUserInput,
    IRegisterUserCase,
} from '../../../core/modules/user/core/use-cases/register-user';
import { TokenGeneratorWrapper } from '../../../core/ports/token/token-generator';
import {
    IUpdateUserCase,
    UpdateUserInput,
} from '../../../core/modules/user/core/use-cases/update-user';

class UserController {
    constructor(
        private readonly registerCase: IRegisterUserCase,
        private readonly updateCase: IUpdateUserCase,
        private readonly tokenGenerator: TokenGeneratorWrapper
    ) {}

    async register(userData: AddUserInput): Promise<string> {
        const userRegistered = await this.registerCase.execute(userData);
        return await this.tokenGenerator({ data: userRegistered });
    }

    async update(input: UpdateUserInput): Promise<void> {
        await this.updateCase.execute(input);
    }
}

export { UserController };
