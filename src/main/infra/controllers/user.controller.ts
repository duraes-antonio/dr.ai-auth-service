import {
    AddUserInput,
    IRegisterUserCase,
    UserLogged,
} from '../../../core/modules/user/core/use-cases/register-user';
import {
    IUpdateUserCase,
    UpdateUserInput,
} from '../../../core/modules/user/core/use-cases/update-user';

class UserController {
    constructor(
        private readonly registerCase: IRegisterUserCase,
        private readonly updateCase: IUpdateUserCase
    ) {}

    async register(userData: AddUserInput): Promise<UserLogged> {
        const userRegistered = await this.registerCase.execute(userData);
        return userRegistered;
    }

    async update(input: UpdateUserInput): Promise<void> {
        await this.updateCase.execute(input);
    }
}

export { UserController };
