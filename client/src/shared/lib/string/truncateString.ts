export const truncateString = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }

    if (maxLength <= 8) {
        return str.slice(0, maxLength);
    }

    const startLength = maxLength - 8;
    return `${str.slice(0, startLength)}...${str.slice(-5)}`;
};
