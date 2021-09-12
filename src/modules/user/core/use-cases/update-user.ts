import { AddUserInput } from './register-user';

export type UpdateUserInput = Partial<Pick<AddUserInput, 'name' | 'image'>>;

// export type UpdateUserCase = UseCase<UpdateUserInput, void>;

export interface IUpdateUserCase {
    execute(input: UpdateUserInput): Promise<void>;
}
