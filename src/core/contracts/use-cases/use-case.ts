interface UseCase<TIn, TOut> {
    handle(input?: TIn): Promise<TIn> | TIn;
}

export { UseCase };
