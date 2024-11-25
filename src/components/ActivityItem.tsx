import React from 'react';

interface ActivityItemProps {
    date: string;
    action: string;
    amount: string;
    usdAmount: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ date, action, amount, usdAmount }) => (
    <div className="flex-col gap-[15px] inline-flex w-full my-6">
        <p className="text-white/50 text-base font-medium">{date}</p>
        <div className="flex justify-between items-center gap-3 w-full">
            <div className="flex items-center gap-3">
                <img className="w-10 h-10" src="money-send.svg" alt="Transaction logo" />
                <div>
                    <h5 className="text-white text-xl font-medium">{action}</h5>
                    <p className="text-white/50 text-lg font-normal">Confirmed</p>
                </div>
            </div>
            <div>
                <h5 className="text-right text-white text-xl font-medium">{amount}</h5>
                <p className="text-right text-white/50 text-lg font-normal">{usdAmount}</p>
            </div>
        </div>
    </div>
);

export default ActivityItem;
