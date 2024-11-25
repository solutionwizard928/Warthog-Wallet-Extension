import React, { useState } from 'react';
import ProfileHeader from "../components/ProfileHeader";
import WalletInfo from "../components/WalletInfo";
import Balance from "../components/Balance";
import ActionButtons from "../components/ActionButtons";
import TabNavigation from "../components/TabNavigation";
import TokenItem from "../components/TokenItem";
import ActivityItem from "../components/ActivityItem";

interface Props {
    wallet: string | null;
}

enum Tab {
    Tokens,
    Activity,
}

const Home: React.FC<Props> = ({ wallet }) => {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.Tokens);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="container min-h-screen">
            <div className="p-2.5 bg-white/10 w-full rounded-48 backdrop-blur-[9px] flex-col justify-center items-center gap-8 inline-flex">
                <ProfileHeader />
                <WalletInfo wallet={wallet} onCopy={() => copyToClipboard(wallet || "")} />
                <Balance balance="17200 Wart" usdValue="5100 $" />
                <ActionButtons />
            </div>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === Tab.Tokens ?
                <TokenItem token="Wart" balance="17200" usdValue="5100" />
                :
                <ActivityItem date="Nov 13, 2024" action="Send USDT" amount="-10 USDT" usdAmount="-$10.01 USD" />
            }
        </div>
    );
};

export default Home;
