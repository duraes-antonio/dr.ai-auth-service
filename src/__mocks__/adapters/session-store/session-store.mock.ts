import { mockDeep } from 'jest-mock-extended';
import { SessionStore } from '../../../core/ports/session-storage/session-storage';

export function factorySessionStorageMock(): SessionStore {
    return mockDeep<SessionStore>();
}
