import React from 'react';

interface TokenItemProps {
    token: string;
    balance: number;
    usdValue: number;
}

const TokenItem: React.FC<TokenItemProps> = ({ token, balance, usdValue }) => (
    <div className="flex justify-between items-center gap-3 my-5 w-full">
        <div className="flex items-center gap-3">
            <img className="w-10 h-10" src="logo.png" alt={`${token} logo`} />
            <div>
                <h5 className="text-white text-xl font-medium">{token}</h5>
                <p className="text-white/50 text-lg font-normal">{balance}</p>
            </div>
        </div>
        <div>
            <h5 className="text-right text-white text-xl font-medium">USD</h5>
            <p className="text-right text-white/50 text-lg font-normal">${(balance * usdValue).toFixed(2)}</p>
        </div>
    </div>
);

export default TokenItem;
