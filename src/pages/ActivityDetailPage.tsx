import { FC, memo, useState, useEffect, useCallback } from 'react';
import Loading from './loading';
import Header from '../components/Header';

interface Activity {
    date: string;
    action: string;
    amount: string;
    usdAmount: string;
}

interface Props {
    selectedActivity: Activity | null;
}

const ActivityDetailPage: FC<Props> = ({ selectedActivity }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const startLoading = useCallback(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!selectedActivity) {
            startLoading();
        } else {
            setIsLoading(false);
        }
    }, [selectedActivity, startLoading]);

    if (isLoading) return <Loading progress={progress} />;
    if (!selectedActivity) return <div>Error: Activity not found.</div>;

    return (
        <div className="container min-h-screen">
            <Header title="Send USDT" />
            <StatusSection />
            <AddressInfo from="0x05c4...cfas" to="0x05c4...cfas" />
            <TransactionDetails selectedActivity={selectedActivity} />
        </div>
    );
};

const StatusSection: FC = memo(() => (
    <div className="p-2.5 w-full rounded-xl border border-[#e0e0e0]/50 flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <span className="text-white text-lg font-semibold">Status</span>
            <ExternalLink icon="Document.svg" label="View on explorer" />
        </div>
        <div className="flex justify-between items-center">
            <span className="text-green-500 text-sm font-normal">Confirmed</span>
            <ExternalLink icon="Copy.svg" label="Copy address" />
        </div>
    </div>
));

const ExternalLink: FC<{ icon: string; label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-2">
        <img src={icon} alt={label} className="w-5 h-5" />
        <span className="text-white text-sm font-normal">{label}</span>
    </div>
);

const AddressInfo: FC<{ from: string; to: string }> = ({ from, to }) => (
    <>
        <div className="flex justify-between mt-2">
            <p className="text-white text-sm font-normal">From</p>
            <p className="text-white text-sm font-normal">To</p>
        </div>
        <div className="w-full mt-2 px-3 py-4 rounded-lg border border-primary/25 flex items-center gap-4">
            <AddressIcon label={from} />
            <div className="h-6 p-3 bg-primary rounded-full flex justify-center items-center">
                <img src="icons/Arrow.svg" alt="Arrow" />
            </div>
            <AddressIcon label={to} />
        </div>
    </>
);

const AddressIcon: FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center gap-2">
        <img className="w-10 h-10 rounded-full object-cover" src="profile-image.png" alt="Profile" />
        <span className="text-white text-sm font-normal font-montserrat">{label}</span>
    </div>
);

const TransactionDetails: FC<{ selectedActivity: Activity }> = ({ selectedActivity }) => (
    <div className="my-5">
        <h3 className="text-white text-xl font-semibold">Transaction</h3>
        <DetailRow label="BTC" value="0.001" />
        <DetailRow label="Amount" value={`${selectedActivity.amount}`} />
        <DetailRow label="Gas Limit (Units)" value="51722" />
        <DetailRow label="Gas Used (Units)" value="213456" />
        <DetailRow label="Base Fee (GWEI)" value="0" />
        <DetailRow label="Priority Fee (GWEI)" value="3" />
        <DetailRow label="Total Gas Fee" value="0.001 BTC /n $50 USD" />
        <DetailRow label="Mas Fee Per Gas" value="0.001 BTC /n $50 USD" />
    </div>
);

const DetailRow: FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center w-full my-2">
        <p className="text-white/50 text-base font-normal">{label}</p>
        <p className="text-right text-white/50 text-base font-normal">{value.split("/n").map((v, i) => <span key={i}>{v}<br /></span>)}</p>
    </div>
);

export default memo(ActivityDetailPage);
