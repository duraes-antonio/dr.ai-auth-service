import { EmailValidator } from '../../../../core/ports/validation/validators/email.validator';

export const TYPES = {
    PersistUser: Symbol.for('PersistUser'),
    FindUserByEmail: Symbol.for('FindUserByEmail'),
    UpdateUser: Symbol.for('UpdateUser'),
    HashManager: Symbol.for('HashManager'),
    EmailValidator: Symbol.for('EmailValidator'),
};

export const USE_CASE_TYPES = {
    IRegisterUserCase: Symbol.for('IRegisterUserCase'),
    IUpdateUserCase: Symbol.for('IUpdateUserCase'),
};

export const INFRA_TYPES = {
    PrismaClient: Symbol.for('PrismaClient'),
    PrismaClientProvider: Symbol.for('PrismaClientProvider'),
    IORedis: Symbol.for('IORedis'),
    FileStorage: Symbol.for('FileStorage'),
    Server: Symbol.for('Server'),
};
