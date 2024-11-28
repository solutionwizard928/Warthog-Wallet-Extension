import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useWallet from "../hooks/useWallet";


function ShowPrivateKey() {
    const { password, seedPhrase, name } = useWallet();
    const navigate = useNavigate();
    const [enteredPassword, setEnteredPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPrivateKeyVisible, setPrivateKeyVisible] = useState(false); // State to track visibility of private key

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    };

    const handleSubmit = () => {
        if (enteredPassword === password) {
            setPrivateKeyVisible(true); // Show private key if password is correct
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    const handleDone = () => {
        if (enteredPassword === password) {
            navigate("/home");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
        <div className="container min-h-screen flex flex-col items-center">
            <Header title="Show Private Key" />

            <div className="flex items-center gap-4 mt-6">
                <img
                    className="w-20 h-20 rounded-full object-cover"
                    src="profile-image.png"
                    alt="Profile"
                />
                <div>
                    <div className="text-xl font-semibold text-white">Hey, {name}</div>
                    <div className="text-xs text-white/50">Connected Wallet</div>
                </div>
            </div>
            {!isPrivateKeyVisible && seedPhrase && (
                <div className="w-full max-w-sm mt-6">
                    <label htmlFor="password" className="text-sm text-white font-normal">
                        Enter password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`w-full bg-primary/10 text-white border rounded-lg px-4 py-2 mt-1 focus:outline-none ${error ? "border-red-500" : "border-primary/50"}`}
                        placeholder="Your password..."
                        value={enteredPassword}
                        onChange={handlePasswordChange}
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
            )}

            {/* Show Private Key Section */}
            {isPrivateKeyVisible && seedPhrase && (
                <div className="mt-6">
                    <p className="text-white text-sm">Private Key</p>
                    <div className="px-3 py-3 rounded-lg border border-[#fdb913]/25 backdrop-blur-md flex items-center">
                        <div className="text-white text-lg ">{seedPhrase}</div>
                    </div>

                    <p className="mt-4 px-2.5 py-2 bg-[#d9d9d9]/10 rounded-lg">
                        <span className="text-[#fa3333] text-sm font-normal">Warning: </span>
                        <span className="text-white/80 text-sm">Never disclose this key to anyone. Your private keys can steal any assets held in your account.</span>
                    </p>
                </div>
            )}

            {/* Button Section */}
            <div className="mt-6 w-full gap-3 flex absolute bottom-3 px-4 left-0">
                {!isPrivateKeyVisible && seedPhrase && (
                    <>
                        <Button className="w-full" onClick={() => navigate("/home")} variant="outline">
                            Cancel
                        </Button>
                        <Button className="w-full" onClick={handleSubmit} variant="primary">
                            Continue
                        </Button>
                    </>
                )}
                {isPrivateKeyVisible && seedPhrase && (
                    <Button className="w-full" onClick={handleDone} variant="primary">
                        Done
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ShowPrivateKey;
