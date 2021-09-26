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
    CacheService: Symbol.for('CacheService'),
    FileStorage: Symbol.for('FileStorage'),
    IORedis: Symbol.for('IORedis'),
    PrismaClient: Symbol.for('PrismaClient'),
    PrismaClientProvider: Symbol.for('PrismaClientProvider'),
    Server: Symbol.for('Server'),
};
