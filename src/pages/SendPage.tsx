import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface User {
    id: string;
    name: string;
    address: string;
    profileImage: string;
}

const users: User[] = [
    { id: "1", name: "John Doe", address: "0x1234...abcd", profileImage: "profile-image.png" },
    { id: "2", name: "Jane Smith", address: "0x5678...efgh", profileImage: "profile-image.png" },
    { id: "3", name: "Alice Brown", address: "0x9012...ijkl", profileImage: "profile-image.png" },
];

function SendPage() {
    const navigate = useNavigate();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>({
        id: "1",
        name: "Jazie Doe",
        address: "0x05c4...1sa5cfas",
        profileImage: "profile-image.png",
    });

    const toggleDropdown = () => setDropdownVisible((prev) => !prev);
    const selectUser = (user: User) => {
        setSelectedUser(user);
        setDropdownVisible(false);
    };

    const [publicAddress, setPublicAddress] = useState<string>("");

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPublicAddress(e.target.value);
    };

    const handelSubmit = () => {
        if (publicAddress === "") {
            setError("Please enter a public address");
        } else {
            navigate("/sendstep2");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handelSubmit();
        }
    };

    return (
        <div className="min-h-screen container relative">
            <Header title="Send" />

            <div className="mt-4">
                <p className="text-white text-sm">From</p>
                <div className="relative">
                    <div
                        className="flex items-center justify-between gap-3 p-4 rounded-lg border border-primary/25 backdrop-blur-md cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                className="w-12 h-12 rounded-full object-cover"
                                src={selectedUser?.profileImage}
                                alt="Profile"
                            />
                            <div>
                                <p className="text-white text-lg font-semibold">{selectedUser?.name}</p>
                                <p className="text-white/50 text-xs">{selectedUser?.address}</p>
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
                                    onClick={() => selectUser(user)}
                                >
                                    <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={user.profileImage}
                                        alt={user.name}
                                    />
                                    <div>
                                        <p className="text-white text-sm font-semibold">{user.name}</p>
                                        <p className="text-white/50 text-xs">{user.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-white text-sm">To</p>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-yellow-300/25 backdrop-blur-md">
                    <input
                        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                        placeholder="Enter public address"
                        value={publicAddress}
                        onChange={handleAddressChange}
                        onKeyDown={handleKeyDown}
                    />
                    <img className="w-6 h-6" src="icons/scan.svg" alt="Scan" />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <div className="mt-6">
                <p className="text-white text-base font-semibold">Recent</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                        <img className="w-12 h-12 rounded-full object-cover" src="profile-image.png" alt="Profile" />
                        <div>
                            <p className="text-white text-lg font-semibold">Jazie Doe</p>
                            <p className="text-white/50 text-xs">0x05c4...1sa5cfas</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-lg">$0.00 USD</p>
                        <p className="text-white/50 text-sm">0 Wart</p>
                    </div>
                </div>
            </div>

            <div className="flex bottom-3 absolute left-0 px-3 w-full gap-3">
                <Button variant="outline" ariaLabel="Backup" className="w-full mt-5 hover:bg-primary/10" onClick={() => navigate("/home")}>
                    Cancel
                </Button>
                <Button variant="primary" ariaLabel="Continue" className="w-full mt-5" onClick={handelSubmit}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default SendPage;
