import { ILogoutCase } from '../../core/use-cases/logout';

export class LogoutCase implements ILogoutCase {
    async execute(input: string): Promise<void> {
        return Promise.resolve();
    }
}
