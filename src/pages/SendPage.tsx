import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function SendPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen container">
            <Header title="Send" />

            <div className="mt-4">
                <p className="text-white text-sm">From</p>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md">
                    <img className="w-12 h-12 rounded-full" src="profile-image.png" alt="Profile" />
                    <div>
                        <p className="text-white text-lg font-semibold">Jazie Doe</p>
                        <p className="text-gray-400 text-xs">0x05c4...1sa5cfas</p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-white text-sm">To</p>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-yellow-300/25 backdrop-blur-md">
                    <input
                        className="flex-1 bg-transparent text-gray-400 text-sm placeholder-gray-500 outline-none"
                        placeholder="Enter public address"
                    />
                    <img className="w-6 h-6" src="icons/scan.svg" alt="Scan" />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-white text-base font-semibold">Recent</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" src="profile-image.png" alt="Profile" />
                        <div>
                            <p className="text-white text-lg font-semibold">Jazie Doe</p>
                            <p className="text-gray-400 text-xs">0x05c4...1sa5cfas</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-lg">$0.00 USD</p>
                        <p className="text-gray-400 text-sm">0 Wart</p>
                    </div>
                </div>
            </div>

            <div className='flex bottom-3 absolute left-0 px-3 w-full gap-3'>
                <Button variant="outline" ariaLabel="Backup" className="w-full mt-5 hover:bg-primary/10" onClick={() => navigate('/home')}>
                    Cancel
                </Button>
                <Button variant="primary" ariaLabel="Continue" className="w-full mt-5" onClick={() => { }}>
                    Continue
                </Button>
            </div>
        </div >
    );
}

export default SendPage;
