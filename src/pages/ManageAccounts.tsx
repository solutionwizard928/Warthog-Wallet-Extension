import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import AccountCard from "../components/AccountCard";
import useWallet from "../hooks/useWallet";

interface AccountType {
    id: number,
    name: string,
    address: string,
    balance: number,
    balanceUSD: number,
    visible: boolean
}

function ManageAccounts() {
    const { name, nameList, walletList, visibleWalletList, setName, setWallet, setVisibleWalletList, setSelectedWalletIndex } = useWallet();

    const [accounts, setAccounts] = useState<AccountType[]>([] as AccountType[]);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredAccounts = accounts.filter(
        (account) =>
            account.visible &&
            (
                account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.address.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const setPrimaryAccount = (id: number) => {
        console.log("Primary Account Set");
        setName(nameList[id]);
        setWallet(walletList[id]);
        setSelectedWalletIndex(id);
    }

    const removeAccount = (id: number) => {
        setVisibleWalletList(visibleWalletList.map((visible, index) => index !== id ? visible : false));
        console.log(`${name} removed from accounts`);
    }

    useEffect(() => {
        if (nameList.length !== walletList.length) {
            console.log(`**** unmatched error in nameList and walletList:`, nameList.length, walletList.length);
        }
        else {
            setAccounts(nameList.map((name, index) => ({
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
