import { User } from '../entities/user.model';
import { AddUserInput } from '../use-cases/register-user';
import { Entity, EntityId } from '../../../../entities/entity';

export interface UserForUpdate extends Entity {
    imageUrl?: string;
    name?: string;
}

export interface FindUserByEmail {
    findByEmail(email: string): Promise<User | undefined>;
}

export interface PersistUser {
    persist(user: AddUserInput): Promise<EntityId>;
}

export interface UpdateUser {
    update(user: UserForUpdate): Promise<void>;
}

export interface UserRepository
    extends FindUserByEmail,
        PersistUser,
        UpdateUser {}
