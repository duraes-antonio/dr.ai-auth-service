import { IRegisterUserCase } from '../../../../core/modules/user/core/use-cases/register-user';

export const TYPES = {
    PersistUser: Symbol.for('PersistUser'),
    FindUserByEmail: Symbol.for('FindUserByEmail'),
    UpdateUser: Symbol.for('UpdateUser'),
    HashManager: Symbol.for('HashManager'),
};

export const USE_CASE_TYPES = {
    IRegisterUserCase: Symbol.for('IRegisterUserCase'),
    IUpdateUserCase: Symbol.for('IUpdateUserCase'),
};
