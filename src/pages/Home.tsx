import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import ProfileHeader from '../components/ProfileHeader';
import WalletInfo from '../components/WalletInfo';
import Balance from '../components/Balance';
import ActionButtons from '../components/ActionButtons';
import TabNavigation from '../components/TabNavigation';
import TokenItem from '../components/TokenItem';
import ActivityItem from '../components/ActivityItem';
import { useNavigate } from 'react-router-dom';
import useWallet from '../hooks/useWallet';

interface Activity {
    date: string;
    action: string;
    amount: string;
    usdAmount: string;
}

interface Props {
    setSelectedActivity: (activity: Activity) => void;
}

enum Tab {
    Tokens,
    Activity,
}

const activities: Activity[] = [
    // {
    //     date: "Nov 13, 2024",
    //     action: "Send USDT",
    //     amount: "-10 USDT",
    //     usdAmount: "-$10.01 USD",
    // },
];

const Home: React.FC<Props> = ({ setSelectedActivity }) => {
    const { wallet, selectedNodeIndex, nodeList } = useWallet();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Tokens);
    const [balance, setBalance] = useState(0);
    const [balanceUSD, setBalanceUSD] = useState(0);

    const copyToClipboard = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
    }, []);

    const handleActivityClick = (activityItem: Activity) => {
        setSelectedActivity(activityItem);
        navigate('/activity-details');
    };

    const updateBalance = () => {
        if (wallet) {
            axios.get(`${nodeList[selectedNodeIndex]}/account/${wallet}/balance`)
                .then((response) => {
                    console.log("**** here is Home page response", response);
                    const data = response?.data?.data;
                    console.log("**** here is Home page response data", data);
                    setBalance(data?.balance ? parseFloat(data?.balance) : 0);
                    console.log("**** here is Home page response data balance", data?.balance);
                })
                .catch((error) => {
                    console.error("Error fetching balance:", error);
                });
        }
    }

    const updateBalanceUSD = () => {
        axios.get(`${import.meta.env.VITE_APP_XEGGEX_API_URL}`)
            .then((response) => {
                const data = response?.data;
                setBalanceUSD(data?.last_price ? parseFloat(data?.last_price) : 0);
            })
            .catch((error) => {
                console.error("Error fetching balance:", error);
            });
    }

    useEffect(() => {
        console.log("**** here is Home page");
        if (wallet) {
            updateBalance();

            const intervalIdPrice = setInterval(updateBalanceUSD, 1500);
            const intervalId = setInterval(updateBalance, 1500);
            return () => {
                clearInterval(intervalIdPrice);
                clearInterval(intervalId);
            };
        }
    }, []);

    return (
        <div className="container min-h-screen">
            <div className="p-2.5 bg-white/10 w-full rounded-48 backdrop-blur-[9px] flex-col justify-center items-center gap-4 inline-flex">
                <ProfileHeader />
                <WalletInfo wallet={wallet} onCopy={() => copyToClipboard(wallet || "")} />
                <Balance balance={balance ? parseFloat(balance.toFixed(2)) : 0} usdValue={balanceUSD ? parseFloat(balanceUSD.toFixed(2)) : 0} />
                <ActionButtons />
            </div>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === Tab.Tokens ? (
                <TokenItem token="WART" balance={balance ? parseFloat(balance.toFixed(2)) : 0} usdValue={balanceUSD ? parseFloat(balanceUSD.toFixed(2)) : 0} />
            ) : (
                <ActivityItem activities={activities} onActivityClick={handleActivityClick} />
            )}
        </div>
    );
};

export default Home;
