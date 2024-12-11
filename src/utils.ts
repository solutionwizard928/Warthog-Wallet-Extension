const formatWalletAddress = (address: string, startLength: number = 10, endLength: number = 10): string => {
    return `${address.slice(0, startLength)}....${address.slice(-endLength)}`;
};

export {
    formatWalletAddress
}