type UseCase<TIn, TOut> = (input?: TIn) => Promise<TOut> | TOut;

export {UseCase};
