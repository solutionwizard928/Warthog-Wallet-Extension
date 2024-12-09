import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import AccountCard from "../components/AccountCard";
import useWallet from "../hooks/useWallet";

function ManageAccounts() {
    const { setName } = useWallet();

    const [accounts, setAccounts] = useState([
        { name: "Jazie Doe", address: "0x05c4...1sa5cfas", balance: "0.00", balanceUSD: "$0.00" },
        { name: "John Smith", address: "0x1234...abcd", balance: "1.23", balanceUSD: "$123.45" },
        { name: "Alice Brown", address: "0xabcd...1234", balance: "5.67", balanceUSD: "$567.89" },
    ]);

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

    function removeAccount(name: string) {
        setAccounts((prevAccounts) =>
            prevAccounts.filter((account) => account.name !== name)
        );
        console.log(`${name} removed from accounts`);
    }

    return (
        <div className="min-h-screen container relative px-4">
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
            <div className="h-[63vh] overflow-y-scroll">
                {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account, index) => (
                        <AccountCard
                            key={index}
                            {...account}
                            isLast={index === filteredAccounts.length - 1}
                            setPrimaryAccount={setPrimaryAccount}
                            removeAccount={removeAccount}
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
