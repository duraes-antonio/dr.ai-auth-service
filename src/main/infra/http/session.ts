import { EntityId } from '../../../core/entities/entity';

export interface RequestSession {
    sessionId: EntityId;
    userId: EntityId;
    userName: string;
    userEmail: string;
}
