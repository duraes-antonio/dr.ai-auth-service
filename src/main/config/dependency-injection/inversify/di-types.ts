import { EmailValidator } from '../../../../core/ports/validation/validators/email.validator';

export const TYPES = {
    PersistUser: Symbol.for('PersistUser'),
    FindUserByEmail: Symbol.for('FindUserByEmail'),
    UpdateUser: Symbol.for('UpdateUser'),
    HashManager: Symbol.for('HashManager'),
    EmailValidator: Symbol.for('EmailValidator'),
    FileStorage: Symbol.for('FileStorage'),
};

export const USE_CASE_TYPES = {
    IRegisterUserCase: Symbol.for('IRegisterUserCase'),
    IUpdateUserCase: Symbol.for('IUpdateUserCase'),
};
