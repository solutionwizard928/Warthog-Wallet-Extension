import React, { useState, useCallback } from 'react';
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
    {
        date: "Nov 13, 2024",
        action: "Send USDT",
        amount: "-10 USDT",
        usdAmount: "-$10.01 USD",
    },
];

const Home: React.FC<Props> = ({ setSelectedActivity }) => {
    const { wallet } = useWallet();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Tokens);
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }, []);

    const handleActivityClick = (activityItem: Activity) => {
        setSelectedActivity(activityItem);
        navigate('/activity-details');
    };

    return (
        <div className="container min-h-screen">
            <div className="p-2.5 bg-white/10 w-full rounded-48 backdrop-blur-[9px] flex-col justify-center items-center gap-8 inline-flex">
                <ProfileHeader />
                <WalletInfo wallet={wallet} onCopy={() => copyToClipboard(wallet || "")} isCopied={isCopied} />
                <Balance balance="17200 Wart" usdValue="5100 $" />
                <ActionButtons />
            </div>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === Tab.Tokens ? (
                <TokenItem token="Wart" balance="17200" usdValue="5100" />
            ) : (
                <ActivityItem activities={activities} onActivityClick={handleActivityClick} />
            )}
        </div>
    );
};

export default Home;
