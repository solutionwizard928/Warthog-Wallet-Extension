import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineSwap } from "react-icons/ai";
import UserDropdown from "../components/UserDropdown";
import NetworkDropdown from "../components/NetworkDropdown";

interface User {
    id: string;
    name: string;
    address: string;
    profileImage: string;
}

interface Network {
    id: string;
    name: string;
    logo: string;
}

const networks: Network[] = [
    { id: "1", name: "Wart", logo: "logo.png" },
    { id: "2", name: "ETH", logo: "icons/eth_logo.svg" },
    { id: "3", name: "BNB", logo: "icons/bnb_logo.png" },
    { id: "4", name: "POL", logo: "icons/pol.png" },
];

const users: User[] = [
    { id: "1", name: "John Doe", address: "0x1234...abcd", profileImage: "profile-image.png" },
    { id: "2", name: "Jane Smith", address: "0x5678...efgh", profileImage: "profile-image.png" },
    { id: "3", name: "Alice Brown", address: "0x9012...ijkl", profileImage: "profile-image.png" },
];

function SendFinalStep() {
    const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
    const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(networks[0]);
    const [isSwapped, setSwapped] = useState(false);

    const handleSwap = () => {
        setSwapped((prev) => !prev); // Toggle the swap state
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen container relative">
            <Header title="Send" />

            <div className="flex flex-col gap-1">
                <p className="text-white text-sm">From</p>
                <UserDropdown users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
                <NetworkDropdown networks={networks} selectedNetwork={selectedNetwork} onSelectNetwork={setSelectedNetwork} handleSwap={handleSwap} isSwapped={isSwapped} />

                <p className="text-white text-sm mt-3">To</p>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md">
                    <img className="w-12 h-12 rounded-full" src="profile-image.png" alt="Profile" />
                    <div>
                        <p className="text-white text-lg font-semibold">Jazie Doe</p>
                        <p className="text-white/50 text-xs">0x05c4...1sa5cfas</p>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <img className="w-12 h-12 rounded-full" src={selectedNetwork?.logo} alt="logo" />
                        <div>
                            <p className="text-white text-lg font-semibold">{selectedNetwork?.name}</p>
                        </div>
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

            </div>

            <div className="flex bottom-3 absolute left-0 px-3 w-full gap-3">
                <Button variant="outline" ariaLabel="Backup" className="w-full mt-5 hover:bg-primary/10" onClick={() => navigate('/home')}>
                    Cancel
                </Button>
                <Button variant="primary" ariaLabel="Continue" className="w-full mt-5" onClick={() => { }}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default SendFinalStep;