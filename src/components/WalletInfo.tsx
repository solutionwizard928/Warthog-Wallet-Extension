import React from 'react';
import { formatWalletAddress } from '../utils';

interface WalletInfoProps {
    wallet: string | null;
    onCopy: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ wallet, onCopy }) => (
    <div className="flex-col gap-2.5 py-4 px-2 rounded-[10px] border border-[#e0e0e0] w-full">
        <div className="flex items-center gap-3">
            <div className="w-[27px] h-[27px] bg-gradient-to-br from-[#fdb913] to-[#9f750d] rounded-full" />
            <h2 className="text-white text-lg font-normal cursor-pointer" onClick={onCopy}>{formatWalletAddress(wallet || "")}</h2>
        </div>
        <div className="flex gap-8 mt-5">
            <a href={`https://wartscan.io/account/${wallet}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <img src="Document.svg" alt="Document" className="w-5 h-5" />
                <span className="text-white text-sm">View on explorer</span>
            </a>
        </div>
    </div>
);

export default WalletInfo;
