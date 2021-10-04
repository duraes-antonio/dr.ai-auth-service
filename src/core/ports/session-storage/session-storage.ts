import { EntityId } from '../../entities/entity';
import { UserSession } from '../../modules/user/core/entities/session.model';

export interface SessionStore {
    get(sessionId: EntityId): Promise<UserSession | null>;

    set(sessionId: EntityId, session: UserSession): Promise<void>;

    remove(sessionId: EntityId): Promise<void>;
}
