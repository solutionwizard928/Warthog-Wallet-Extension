import { useState, useCallback } from "react";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useWallet from "../hooks/useWallet";

function ImportPage() {
    const { importWallet } = useWallet();
    const navigate = useNavigate();
    const [inputWords, setInputWords] = useState<string[]>(Array(12).fill(""));
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isCompleted = inputWords.every(word => word.trim().length > 0);

    // Debounced input handler for performance optimization
    const handleInputChange = useCallback((index: number, value: string) => {
        setInputWords(prev => {
            const updatedWords = [...prev];
            updatedWords[index] = value.trim();
            return updatedWords;
        });
    }, []);

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('Text');
        const words = pastedText.split(/\s+/);
        const updatedWords = [...inputWords];

        for (let i = 0; i < words.length; i++) {
            if (i >= updatedWords.length) break;
            updatedWords[i] = words[i];
        }

        setInputWords(updatedWords);
    };

    const recoverWallet = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            const seedPhrase = inputWords.join(" ");
            importWallet(seedPhrase);
            // setSeedPhrase(seedPhrase);
            // setWallet(wallet.address);
            setTimeout(() => {
                navigate("/set-password");
            }, 3000);
        } catch (e) {
            console.log("Failed to recover wallet:", e);
            setError("Invalid recovery phrase. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <section className="container min-h-screen py-5 relative overflow-y-scroll" onPaste={handlePaste}>
            <BackButton />
            <div className="flex flex-col justify-center items-center gap-5 mt-3">
                <h1 className="text-center text-white text-xl font-semibold leading-[30px]">
                    Import your wallet
                </h1>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
            <div className="grid grid-cols-2 gap-5 my-5">
                {inputWords.map((word, index) => (
                    <div key={index} className="bg-primary/20 rounded-full flex items-center">
                        <div className={`flex justify-center items-center w-8 h-10 rounded-s-full pl-2 pr-1 ${isProcessing ? "bg-primary" : ""}`}>
                            <span className="text-white text-lg font-normal select-none">{index + 1}</span>
                        </div>
                        <div className="w-[0.1px] h-10 bg-white/20" />
                        <input
                            type="text"
                            className="flex-grow text-center text-white text-lg font-normal bg-transparent focus:outline-none w-32"
                            placeholder=''
                            title={`Seed phrase word ${index + 1}`}
                            value={word}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            disabled={isProcessing}
                        />
                    </div>
                ))}
            </div>
            <div className="grid gap-5 w-full absolute bottom-5 left-0 px-6">
                <Button
                    onClick={recoverWallet}
                    variant="primary"
                    ariaLabel="Continue"
                    className="w-full"
                    disabled={!isCompleted || isProcessing}
                >
                    {isProcessing ? "Processing..." : "Continue"}
                </Button>
            </div>
        </section>
    )
}

export default ImportPage