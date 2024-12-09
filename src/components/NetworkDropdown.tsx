import React, { useState } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';

interface Network {
    id: string;
    name: string;
    logo: string;
}

interface NetworkDropdownProps {
    networks: Network[];
    selectedNetwork: Network | null;
    onSelectNetwork: (network: Network) => void;
    handleSwap: () => void;
    isSwapped: boolean;
}

const NetworkDropdown: React.FC<NetworkDropdownProps> = ({ networks, selectedNetwork, onSelectNetwork, handleSwap, isSwapped }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible((prev) => !prev);

    return (
        <div className="relative">
            <div className="flex items-center justify-between gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md">
                <div className="flex items-center gap-3" onClick={toggleDropdown}>
                    <img className="w-12 h-12 rounded-full" src={selectedNetwork?.logo} alt="logo" />
                    <div>
                        <p className="text-white text-lg font-semibold">{selectedNetwork?.name}</p>
                    </div>
                    <FaChevronDown className="text-white" />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="text-right">
                        {isSwapped ? (
                            <>
                                <p className="text-white text-lg">$0.00</p>
                                <p className="text-white/50 text-sm">0 {selectedNetwork?.name}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-white text-lg">0 {selectedNetwork?.name}</p>
                                <p className="text-white/50 text-sm">$0.00</p>
                            </>
                        )}
                    </div>
                    <AiOutlineSwap className="text-white rotate-90 text-2xl" onClick={handleSwap} />
                </div>
            </div>
            {isDropdownVisible && (
                <div className="absolute z-10 mt-2 left-0 w-full bg-black border border-primary/50 rounded-lg overflow-hidden">
                    {networks.map((network) => (
                        <div
                            key={network.id}
                            className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer"
                            onClick={() => {
                                onSelectNetwork(network);
                                setDropdownVisible(false);
                            }}
                        >
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={network.logo}
                                alt={network.name}
                            />
                            <div>
                                <p className="text-white text-sm font-semibold">{network.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NetworkDropdown;