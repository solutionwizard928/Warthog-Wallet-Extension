import { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { IoMdMore } from "react-icons/io";
import useWallet from "../hooks/useWallet";

const AccountCard = ({
    name,
    address,
    balance,
    balanceUSD,
    isLast,
    setPrimaryAccount,
}: {
    name: string;
    address: string;
    balance: string;
    balanceUSD: string;
    isLast: boolean;
    setPrimaryAccount: (name: string) => void;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    // Close the menu if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="flex justify-between items-center w-full mt-6 relative">
                <div className="flex items-center gap-4">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="profile-image.png"
                        alt={`${name} Profile`}
                    />
                    <div>
                        <div className="text-white text-xl font-semibold">{name}</div>
                        <div className="text-white/50 text-xs">{address}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <div className="text-white text-xl font-medium">{balance}</div>
                        <div className="text-white/50 text-lg">{balanceUSD}</div>
                    </div>
                    <div
                        ref={buttonRef}
                        className="text-white text-3xl cursor-pointer"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <IoMdMore />
                    </div>
                </div>
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="p-3 top-8 z-10 bg-[#272727] rounded-[10px] border border-[#fdb913] absolute right-0 w-[210px] mt-2"
                    >
                        <p
                            className="text-white text-lg font-normal cursor-pointer"
                            onClick={() => {
                                setPrimaryAccount(name);
                                setIsMenuOpen(false);
                            }}
                        >
                            Primary Account
                        </p>
                    </div>
                )}
            </div>
            {!isLast && <div className="h-[0px] border border-white/20 my-3" />}
        </>
    );
};

function ManageAccounts() {
    const { setName } = useWallet();

    const accounts = [
        { name: "Jazie Doe", address: "0x05c4...1sa5cfas", balance: "0.00", balanceUSD: "$0.00" },
        { name: "John Smith", address: "0x1234...abcd", balance: "1.23", balanceUSD: "$123.45" },
        { name: "Alice Brown", address: "0xabcd...1234", balance: "5.67", balanceUSD: "$567.89" },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const filteredAccounts = accounts.filter(
        (account) =>
            account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            account.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function setPrimaryAccount(name: string) {
        console.log("Primary Account Set");
        setName(name);
    }

    return (
        <div className="min-h-screen container px-4">
            <Header title="Select an Account" />
            <div className="relative w-full">
                <input
                    className="h-14 w-full pl-12 pr-4 py-2 bg-primary/10 rounded-full border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    src="icons/search-icon.svg"
                    alt="Search Icon"
                />
            </div>
            <div className="h-[60vh] overflow-y-scroll">
                {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account, index) => (
                        <AccountCard
                            key={index}
                            {...account}
                            isLast={index === filteredAccounts.length - 1}
                            setPrimaryAccount={setPrimaryAccount}
                        />
                    ))
                ) : (
                    <div className="text-center text-white/50 mt-6">No accounts found</div>
                )}
            </div>
            <div className="absolute bottom-3 w-full left-0 px-4">
                <Button
                    variant="primary"
                    ariaLabel="Add Account"
                    onClick={() => console.log("Add Account")}
                    className="w-full"
                >
                    + Add more account
                </Button>
            </div>
        </div>
    );
}

export default ManageAccounts;
