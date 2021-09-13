export type UseCase<TIn, TOut> = (input?: TIn) => Promise<TOut> | TOut;

export interface IUseCase<TIn, TOut> {
    execute(input: TIn): Promise<TOut>;
}
