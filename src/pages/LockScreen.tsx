import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWallet from "../hooks/useWallet";
import { ethers } from "ethers";

function LockScreen() {
    const { password, setToken } = useWallet();
    const [enteredPassword, setEnteredPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    };

    const handleSubmit = () => {
        if (enteredPassword === password) {
            const token = ethers.sha256(password + Date.now().toString()).slice(2);
            setToken(token);
            navigate("/home");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };


    return (
        <div className="min-h-screen container relative">
            <div className="flex flex-col justify-center items-center h-full mt-10">
                <div className="flex flex-col items-center gap-6 mb-8">
                    <img className="w-28 h-28" src="logo.png" alt="logo" />
                    <div className="text-center">
                        <div className="text-white text-2xl font-semibold leading-8 mb-2">
                            Welcome back!
                        </div>
                        <div className="text-white/60 text-base font-normal leading-6">
                            Please enter your password to access your account.
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm px-4">
                    <label htmlFor="password" className="text-white text-sm font-normal">
                        Enter password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`w-full bg-primary/10 text-white border rounded-lg px-4 py-2 mt-1 focus:outline-none ${error ? "border-red-500" : "border-primary/50"
                            }`}
                        placeholder="Your password..."
                        value={enteredPassword}
                        onKeyDown={handleKeyDown}
                        onChange={handlePasswordChange}
                    />
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                    <div className="text-right text-white text-sm font-normal mt-2">
                        <p className="hover:underline">
                            Forgot Password?
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 justify-center items-center mt-5 w-full max-w-sm absolute bottom-4">
                <Button variant="primary" className="w-full" onClick={handleSubmit}>
                    Continue
                </Button>

                <div className="w-full text-center mt-3">
                    <span className="text-white text-sm font-medium underline">Need help</span>
                    <span className="text-white">? Contact </span>
                    <span className="text-primary text-sm font-medium">Warthog Support</span>
                </div>
            </div>
        </div>
    );
}

export default LockScreen;
