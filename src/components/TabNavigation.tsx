import React from 'react';

enum Tab {
    Tokens,
    Activity,
}

interface TabNavigationProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-white/20 mt-5">
        <ul className="flex -mb-px">
            {[Tab.Tokens, Tab.Activity].map((tab) => (
                <li key={tab} className="w-full">
                    <button
                        onClick={() => setActiveTab(tab)}
                        className={`p-5 w-full text-[22px] font-semibold  ${activeTab === tab ? "border-b-4 border-primary font-medium text-white" : "text-white/50"}`}
                    >
                        {Tab[tab]}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default TabNavigation;
