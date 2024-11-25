import React, { useState } from 'react';
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

interface SetPasswordProps {
    setPassword: (password: string) => void;
}

const SetPassword: React.FC<SetPasswordProps> = ({ setPassword }) => {
    const navigate = useNavigate();
    const [password, setPass] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

    const validatePasswords = () => {
        const newErrors: { password?: string; confirmPassword?: string } = {};
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validatePasswords()) {
            setPassword(password);
            navigate('/home');
        }
    };

    return (
        <div className="container min-h-screen relative">
            <BackButton />
            <div className="grid justify-center items-center gap-5 mt-2">
                <h1 className="text-center text-white text-xl font-semibold capitalize">
                    Choose your password
                </h1>
                <p className="text-center text-white text-sm font-medium leading-tight">
                    Please write this down on paper as well.
                </p>
            </div>
            <div className="mt-5 grid gap-5">
                <div>
                    <label className="text-white text-sm font-normal">Enter Password</label>
                    <input
                        type={"password"}
                        className="w-full bg-primary/10 placeholder:text-sm text-white border border-primary/50 rounded-lg px-4 py-2 mt-1 focus-visible:outline-primary"
                        placeholder="Your password..."
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                    <label className="text-white text-sm font-normal">Enter Password Again</label>
                    <input
                        type={"password"}
                        className="w-full bg-primary/10 placeholder:text-sm text-white border border-primary/50 rounded-lg px-4 py-2 mt-1 focus-visible:outline-primary"
                        placeholder="Your password..."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
            </div>
            <div className="absolute bottom-5 left-0 px-6 w-full">
                <Button className="w-full" variant="primary" onClick={handleSubmit}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default SetPassword;
