export type UpdateUserInput = {
    id: number;
    name: string;
    image?: File;
};

export interface IUpdateUserCase {
    execute(input: UpdateUserInput): Promise<void>;
}
