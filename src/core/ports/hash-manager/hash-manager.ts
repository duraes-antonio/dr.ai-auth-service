export type HashManagerOptions = {
    salt?: Buffer;
};

export interface HashManager {
    compare(
        hash: string,
        plain: string,
        options?: HashManagerOptions
    ): Promise<boolean>;

    generate(plain: string, options?: HashManagerOptions): Promise<string>;
}
