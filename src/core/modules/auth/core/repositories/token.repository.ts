export type PersistToken = (token: string) => Promise<void>;

export type CheckTokenExists = (token: string) => Promise<boolean>;
