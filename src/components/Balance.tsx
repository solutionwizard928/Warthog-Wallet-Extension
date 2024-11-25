import React from 'react';

interface BalanceProps {
    balance: string;
    usdValue: string;
}

const Balance: React.FC<BalanceProps> = ({ balance, usdValue }) => (
    <div className="grid justify-start w-full px-5">
        <h3 className="text-white/50 text-lg font-semibold capitalize">Balance</h3>
        <h3 className="text-white text-4xl font-semibold capitalize">{balance}</h3>
        <h3 className="text-white/50 text-lg font-medium capitalize">{usdValue}</h3>
    </div>
);

export default Balance;
