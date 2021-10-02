import { EntityId } from '../../../core/entities/entity';

export interface RequestSession {
    sessionId: string;
    userId: EntityId;
    userName: string;
    userEmail: string;
}

export interface SessionStore<T = RequestSession> {
    get<T>(sessionId: EntityId): Promise<T>;

    set<T>(sessionId: EntityId, session: T): Promise<void>;

    remove(sessionId: EntityId): Promise<void>;
}
