import { ILogoutCase } from '../../core/use-cases/logout';
import { PersistToken } from '../../core/repositories/token.repository';
import { RequiredError } from '../../../../errors/required';
import { factoryMessageError } from '../../../../errors/error-message.factory';

export class LogoutCase implements ILogoutCase {
    constructor(private readonly persistToken: PersistToken) {}

    async execute(input: string): Promise<void> {
        if (input?.trim()) {
            return await this.persistToken(input);
        }

        throw new RequiredError(
            'current token',
            factoryMessageError.requiredParam
        );
    }
}
