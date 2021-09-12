import { AddUserInput } from './register-user';
import { UseCase } from '../../../../core/contracts/use-cases/use-case';

export type UpdateUserInput = Partial<Pick<AddUserInput, 'name' | 'image'>>;

export type UpdateUserCase = UseCase<UpdateUserInput, void>;
