import React from 'react';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

interface RecoveryPhaseProps {
    mnemonic: string | null;
}

const RecoveryPhase: React.FC<RecoveryPhaseProps> = ({ mnemonic }) => {
    const navigate = useNavigate();

    const handleBackup = () => {
        if (!mnemonic) return;
        const blob = new Blob([mnemonic], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recovery-phrase.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen container">
            <BackButton />
            <div className="flex-col justify-start items-start gap-5 inline-flex mt-2">
                <div className="self-stretch text-center text-white text-xl font-semibold capitalize">
                    This is your recovery phrase
                </div>
                <div className="self-stretch text-center text-white text-sm font-medium leading-tight">
                    Make sure to write it down as shown here. You have to verify this later.
                </div>
            </div>

            <div className="mt-5">
                <div className="grid grid-cols-2 gap-4">
                    {mnemonic?.split(' ').map((word, index) => (
                        <div key={index} className="bg-primary/20 rounded-full px-1 justify-start items-center inline-flex">
                            <div className="justify-center items-center flex w-8">
                                <div className="text-center text-white text-lg font-normal select-none">{index + 1}</div>
                            </div>
                            <div className="w-[0.1px] h-10 bg-white/20" />
                            <div className="grow shrink basis-0 justify-center items-center flex">
                                <div className="text-center text-white text-lg font-normal">{word}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Button variant="outline" ariaLabel="Backup" className="w-full mt-5 hover:bg-primary/10" onClick={handleBackup}>
                    Backup
                </Button>
                <Button variant="primary" ariaLabel="Continue" className="w-full mt-5" onClick={() => navigate('/validate')}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default RecoveryPhase;
