function required(fieldName: string): string {
    return `The '${fieldName}' field is required.`;
}

function maxLength(fieldName: string, maxLimit: number): string {
    return `The maximum length for the ${fieldName} field is ${maxLimit} characters.`;
}

function invalidFormat(fieldName: string, example?: string): string {
    const defaultMessage = `The ${fieldName} field is not in a valid format.`;
    return example
        ? `${defaultMessage} Valid example: ${example}.`
        : defaultMessage;
}

function conflict(entityName: string, attributeName: string): string {
    return `There is already a ${entityName} with this ${attributeName}.`;
}

export const factoryMessageError = {
    required,
    maxLength,
    invalidFormat,
    conflict,
};
