import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { formatWalletAddress } from "../utils";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import useWallet from "../hooks/useWallet";

const AccountCard = ({
    id,
    name,
    address,
    balance,
    balanceUSD,
    isLast,
    setPrimaryAccount,
}: {
    id: number;
    name: string;
    address: string;
    balance: number;
    balanceUSD: number;
    isLast: boolean;
    setPrimaryAccount: (id: number) => void;
}) => {
    const { selectedWalletIndex } = useWallet();
    return (
        <>
            <div className="flex justify-between items-center w-full mt-6 relative">
                <div className="flex items-center gap-4">
                    {/* <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="profile-image.png"
                        alt={`${name} Profile`}
                    /> */}
                    <Jazzicon diameter={48} seed={id} />
                    <div>
                        <div className="text-white text-xl font-semibold">{name}</div>
                        <div className="text-white/50 text-xs">{formatWalletAddress(address)}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="flex flex-col items-end hidden">
                        <div className="text-white text-xl font-medium">{balance}</div>
                        <div className="text-white/50 text-lg">${balanceUSD}</div>
                    </div>
                </div>
                {
                    selectedWalletIndex === id ? 
                        <IoIosCheckmarkCircle className="w-6 h-6 cursor-pointer"/> : 
                        <IoIosCheckmarkCircleOutline className="w-6 h-6 cursor-pointer" onClick={()=>setPrimaryAccount(id)}/>
                }
            </div>
            {!isLast && <div className="h-[0px] border border-white/20 my-3" />}
        </>
    );
};

export default AccountCard;
