import { useState } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface AccountDetailsProps {
    wallet: string | null;
}

function IconButton({ iconSrc, label, onClick }: { iconSrc: string; label: string; onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={onClick}>
            <div className="flex justify-center items-center w-16 h-16 bg-[#f1f1f1] rounded-full">
                <img src={iconSrc} alt={label} />
            </div>
            <div className="text-sm text-white">{label}</div>
        </div>
    );
}

function AccountDetails({ wallet }: AccountDetailsProps) {
    const [copyLabel, setCopyLabel] = useState("Copy");
    const navigate = useNavigate();

    const handleCopyAddress = () => {
        if (wallet) {
            navigator.clipboard.writeText(wallet)
                .then(() => {
                    setCopyLabel("Copied!");
                    setTimeout(() => setCopyLabel("Copy"), 2000);
                })
                .catch((err) => {
                    console.log("Failed to copy wallet address: ", err);
                });
        } else {
            alert("No wallet connected to copy.");
        }
    };

    return (
        <div className="min-h-screen container">
            <BackButton />

            <div className="flex justify-center items-center gap-4 mt-6">
                <img
                    className="w-20 h-20 rounded-full object-cover"
                    src="profile-image.png"
                    alt="Profile"
                />
                <div>
                    <div className="text-xl font-semibold text-white">Hey, Jazie</div>
                    <div className="text-xs text-white/50">Connected Wallet</div>
                </div>
                <img className="w-6 h-6 cursor-pointer" src="icons/edit-2.svg" alt="Edit Profile" />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 flex flex-col items-center gap-4 mt-6">
                <img
                    src="qrCode.png"
                    alt="QR Code to receive payment"
                    className="w-32 h-32"
                />
                <div className="text-sm text-gray-200">{wallet || "No wallet connected"}</div>
            </div>

            <div className="flex justify-center gap-10 mt-6">
                <IconButton iconSrc="icons/Icon-copy.svg" label={copyLabel} onClick={handleCopyAddress} />
            </div>

            <div className="w-full absolute bottom-3 left-0 px-3">
                <Button className="w-full" onClick={() => navigate('/private-key')}>
                    Show Private Key
                </Button>
            </div>
        </div>
    );
}

export default AccountDetails;
