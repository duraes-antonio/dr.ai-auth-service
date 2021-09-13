type HashManagerOptions = {
    salt?: Buffer;
};

type HashComparator = (
    hash: string,
    plain: string,
    options?: HashManagerOptions
) => Promise<boolean>;

type HashGenerator = (
    plain: string,
    options?: HashManagerOptions
) => Promise<string>;

export { HashComparator, HashGenerator, HashManagerOptions };
