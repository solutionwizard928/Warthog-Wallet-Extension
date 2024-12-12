import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { formatWalletAddress } from '../utils';

interface AccountType {
    id: number,
    name: string,
    address: string,
    balance: number,
    balanceUSD: number,
    visible: boolean
}

interface UserDropdownProps {
    users: AccountType[];
    selectedUser: AccountType | null;
    onSelectUser: (id: number) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, selectedUser, onSelectUser }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => setDropdownVisible((prev) => !prev);

    return (
        <div className="relative">
            <div
                className="flex items-center justify-between gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex items-center gap-3">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={"profile-image.png"}
                        alt="Profile"
                    />
                    <div>
                        <p className="text-white text-lg font-semibold">{selectedUser?.name}</p>
                        <p className="text-white/50 text-xs">{formatWalletAddress(selectedUser?.address || "")}</p>
                    </div>
                </div>
                <FaChevronDown className="text-white" />
            </div>
            {isDropdownVisible && (
                <div className="absolute z-10 mt-2 left-0 w-full bg-black border border-primary/50 rounded-lg overflow-hidden">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer"
                            onClick={() => {
                                onSelectUser(user.id);
                                setDropdownVisible(false);
                            }}
                        >
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={"profile-image.png"}
                                alt={user.name}
                            />
                            <div>
                                <p className="text-white text-sm font-semibold">{user.name}</p>
                                <p className="text-white/50 text-xs">{formatWalletAddress(user.address || "")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDropdown;