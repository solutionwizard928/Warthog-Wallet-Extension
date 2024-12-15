import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import useWallet from "../hooks/useWallet"
import { formatWalletAddress } from "../utils"
import Jazzicon from "react-jazzicon/dist/Jazzicon";

interface AccountType {
    id: number,
    name: string,
    address: string,
    balance: number,
    balanceUSD: number,
    visible: boolean
}

function SendPage() {
    const navigate = useNavigate();

    const { name, wallet, nameList, selectedWalletIndex, walletList, visibleWalletList, setSelectedWalletIndex, setName, setWallet, setTmpDestinationWalletState } = useWallet();

    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [publicAddress, setPublicAddress] = useState<string>("");
    
    const toggleDropdown = () => setDropdownVisible((prev) => !prev);

    const selectUser = (id: number) => {
        setName(nameList[id]);
        setWallet(walletList[id]);
        setSelectedWalletIndex(id);
        setDropdownVisible(false);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicAddress(e.target.value);
    };

    const handelSubmit = () => {
        if (publicAddress === "") {
            setError("Please enter a public address");
        } else {
            setTmpDestinationWalletState(publicAddress);
            navigate("/sendstep2");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handelSubmit();
        }
    };

    useEffect(() => {
        if (nameList.length !== walletList.length) {
            console.log(`**** unmatched error in nameList and walletList:`, nameList.length, walletList.length);
        }
        else{
            setAccounts(nameList.map((name, index) => ( {
                id: index,
                name,
                address: walletList[index],
                balance: 0,
                balanceUSD: 0,
                visible: visibleWalletList[index]
            })))
        }
    }, [walletList, nameList, visibleWalletList])
    
    return (
        <div className="min-h-screen container relative">
            <Header title="Send" />

            <div className="mt-4">
                <p className="text-white text-sm">From</p>
                <div className="relative">
                    <div
                        className="flex items-center justify-between gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <div className="flex items-center gap-3">
                            {/* <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={"profile-image.png"}
                                alt="Profile"
                            /> */}
                            { <Jazzicon diameter={48} seed={selectedWalletIndex} /> }
                            <div>
                                <p className="text-white text-lg font-semibold">{name}</p>
                                <p className="text-white/50 text-xs">{formatWalletAddress(wallet || "")}</p>
                            </div>
                        </div>
                        <FaChevronDown className="text-white" />
                    </div>
                    {isDropdownVisible && (
                        <div className="absolute z-10 mt-2 left-0 w-full bg-black border border-primary/50 rounded-lg overflow-hidden">
                            {accounts.map((account) => (
                                <div
                                    key={account.id}
                                    className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer"
                                    onClick={() => selectUser(account.id)}
                                >
                                    {/* <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={"profile-image.png"}
                                        alt={account.name}
                                    /> */}
                                    <div className="w-10 h-10">
                                        { <Jazzicon diameter={40} seed={account.id} /> }
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{account.name}</p>
                                        <p className="text-white/50 text-xs">{account.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-white text-sm">To</p>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-yellow-300/25 backdrop-blur-md">
                    <input
                        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                        placeholder="Enter public address"
                        value={publicAddress}
                        onChange={handleAddressChange}
                        onKeyDown={handleKeyDown}
                    />
                    <img className="w-6 h-6" src="icons/scan.svg" alt="Scan" />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            {/* TODO: add recent section: comming soon */}
            {/* <div className="mt-6">
                <p className="text-white text-base font-semibold">Recent</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" src="profile-image.png" alt="Profile" />
                        <div>
                            <p className="text-white text-lg font-semibold">{name}</p>
                            <p className="text-white/50 text-xs">{formatWalletAddress(wallet || "")}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-lg">? USD</p>
                        <p className="text-white/50 text-sm">? Wart</p>
                    </div>
                </div>
            </div> */}

            <div className="flex bottom-3 absolute left-0 px-3 w-full gap-3">
                <Button variant="outline" ariaLabel="Backup" className="w-full mt-5 hover:bg-primary/10" onClick={() => navigate("/home")}>
                    Cancel
                </Button>
                <Button variant="primary" ariaLabel="Continue" className="w-full mt-5" onClick={handelSubmit}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default SendPage;
