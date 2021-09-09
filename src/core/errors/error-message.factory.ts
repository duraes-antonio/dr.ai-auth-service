function required(fieldName: string): string {
    return `The '${fieldName}' field is required.`;
}

function maxLength(fieldName: string, maxLimit: number): string {
    return `The maximum length for the ${fieldName} field is ${maxLimit} characters.`;
}

export const factoryMessageError = {
    required,
    maxLength,
};
