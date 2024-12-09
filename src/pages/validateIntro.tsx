import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

interface ValidateIntroProps {
    recoveryPhrase: string[];
    onGoBack: () => void;
    onComplete: () => void;
}

const ValidateIntro: React.FC<ValidateIntroProps> = ({ recoveryPhrase, onGoBack, onComplete }) => {
    const [inputWords, setInputWords] = useState<string[]>(Array(recoveryPhrase.length).fill(''));
    const [errors, setErrors] = useState<boolean[]>(Array(recoveryPhrase.length).fill(false));
    const [isCompleted, setIsCompleted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const savedInputWords = localStorage.getItem('inputWordsBackup');
        if (savedInputWords) {
            setInputWords(JSON.parse(savedInputWords));
        }
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const updatedWords = [...inputWords];
        updatedWords[index] = value;
        setInputWords(updatedWords);
        setIsCompleted(updatedWords.every((word) => word.trim() !== ''));
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('Text');
        const words = pastedText.split(/\s+/); // Split pasted text into words by whitespace
        const updatedWords = [...inputWords];

        for (let i = 0; i < words.length; i++) {
            if (i >= updatedWords.length) break; // Prevent exceeding array bounds
            updatedWords[i] = words[i];
        }

        setInputWords(updatedWords);
        setIsCompleted(updatedWords.every((word) => word.trim() !== ''));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleContinueClick();
        }
    };

    const handleContinueClick = () => {
        const newErrors = inputWords.map((word, idx) => word.trim() !== recoveryPhrase[idx]);
        setErrors(newErrors);

        if (newErrors.every((error) => !error)) {
            setIsProcessing(true);
            localStorage.setItem('inputWordsBackup', JSON.stringify(inputWords));
            setTimeout(() => {
                onComplete();
            }, 3000);
        }
    };

    return (
        <div className="container min-h-screen py-5 relative overflow-y-scroll" onPaste={handlePaste}>
            <Header title={isProcessing
                ? 'Perfect. Make sure to securely store your recovery phrase.'
                : errors.some(error => error)
                    ? 'Sorry, that’s not correct. Please try again.'
                    : 'Tap the words in the correct order.'} />
            <div className="grid grid-cols-2 justify-start items-start gap-5 my-5">
                {recoveryPhrase.map((_, index) => (
                    <div key={index} className={`bg-primary/20 rounded-full justify-start items-center inline-flex`}>
                        <div className={`justify-center items-center flex w-8 h-10 rounded-s-full pl-2 pr-1 ${errors[index] ? 'bg-error' : ''} ${isProcessing ? 'bg-primary' : ''}`}>
                            <span className="text-center text-white text-lg font-normal select-none">{index + 1}</span>
                        </div>
                        <div className="w-[0.1px] h-10 bg-white/20" />
                        <div className="flex-grow justify-center items-center flex">
                            <input
                                type="text"
                                className="text-center text-white text-lg font-normal bg-transparent contrast-more:outline-none focus:outline-none w-32 focus-visible:outline-none"
                                title={`Recovery phrase word ${index + 1}`}
                                placeholder=""
                                value={inputWords[index]}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid gap-3 w-full grid-cols-2 absolute bottom-3 left-0 px-3">
                <Button onClick={onGoBack} variant="outline" ariaLabel="Show me again" className="w-full">
                    Show me again
                </Button>
                <Button onClick={handleContinueClick} variant="primary" ariaLabel="Continue" className="w-full" disabled={!isCompleted || isProcessing}>
                    Verify
                </Button>
            </div>
        </div>
    );
};

export default ValidateIntro;
