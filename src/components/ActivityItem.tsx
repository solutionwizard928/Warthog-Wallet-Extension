import React from 'react';

interface ActivityItemProps {
    activities: {
        date: string;
        action: string;
        amount: string;
        usdAmount: string;
    }[];
    onActivityClick: (activity: { date: string; action: string; amount: string; usdAmount: string }) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activities, onActivityClick }) => (
    <>
        {activities.map((item, index) => (
            <div key={index} className="flex-col gap-[15px] inline-flex w-full my-4" onClick={() => onActivityClick(item)}>
                <p className="text-white/50 text-base font-medium">{item.date}</p>
                <div className="flex justify-between items-center gap-3 w-full">
                    <div className="flex items-center gap-3">
                        <img className="w-10 h-10" src="money-send.svg" alt="Transaction logo" />
                        <div>
                            <h5 className="text-white text-xl font-medium">{item.action}</h5>
                            <p className="text-white/50 text-lg font-normal">Confirmed</p>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-right text-white text-xl font-medium">{item.amount}</h5>
                        <p className="text-right text-white/50 text-lg font-normal">{item.usdAmount}</p>
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default ActivityItem;
