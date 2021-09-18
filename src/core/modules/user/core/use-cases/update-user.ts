export type UpdateUserInput = {
    name: string;
    image: File;
};

// export type UpdateUserCase = UseCase<UpdateUserInput, void>;

export interface IUpdateUserCase {
    execute(input: UpdateUserInput): Promise<void>;
}
