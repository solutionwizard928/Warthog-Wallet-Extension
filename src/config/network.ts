export const WARTHOG_NETWORK = {
    chainId: 1337,
    name: 'Warthog Network',
    rpcUrl: 'https://rpc.warthog.network',
    currency: {
        name: 'Warthog',
        symbol: 'WART',
        decimals: 8
    },
    explorer: 'https://wartscan.io/'
} as const;

export const NETWORKS = {
    WARTHOG: WARTHOG_NETWORK
} as const;