export type TokenGeneratorInput<T = unknown> = {
    data: T;

    /// Private key used to sign the token
    privateKey: string;

    /// Expiration date in milliseconds
    expiresIn?: number;
};

export type TokenGenerator = <T = unknown>(
    input: TokenGeneratorInput<T>
) => Promise<string>;
