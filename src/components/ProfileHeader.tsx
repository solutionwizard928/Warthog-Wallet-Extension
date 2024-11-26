import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="flex justify-between w-full">
            <div className="flex items-center gap-3">
                <img
                    src="profile-image.png"
                    alt="Profile"
                    className="w-[70px] h-[70px] rounded-full object-cover"
                />
                <div className="grid gap-1">
                    <h1 className="text-white text-xl font-semibold">Hey, Jazie</h1>
                    <p className="text-white/30 text-xs font-normal">Connected Wallet</p>
                </div>
            </div>
            <div className="relative">
                <div
                    onClick={toggleMenu}
                    className="w-[70px] h-[70px] bg-white/5 rounded-full border border-primary flex justify-center items-center cursor-pointer"
                >
                    <IoSettingsOutline
                        className={`text-white text-3xl transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"
                            }`}
                    />
                </div>

                {isMenuOpen && (
                    <div className="p-5 bg-[#272727] rounded-[10px] border border-[#fdb913] absolute right-0 w-[210px] mt-2">
                        <p className="text-white text-lg font-normal">Account details</p>
                        <div className="border border-white/20 my-2" />
                        <p className="text-white text-lg font-normal">Manage Accounts</p>
                        <div className="border border-white/20 my-2" />
                        <p className="text-white text-lg font-normal cursor-pointer" onClick={() => navigate('/locked')}>Lock Screen</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
