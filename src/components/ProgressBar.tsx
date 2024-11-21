import React from 'react';

interface ProgressBarProps {
    progress: number;
    trackColor?: string;
    barColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    trackColor = 'bg-[#d9d9d9]/25',
}) => {
    return (
        <div className={`w-48 mt-5 ${trackColor} rounded-full h-1 mb-4`}>
            <div
                className={`bg-gradient-to-r from-[#fdb913] to-[#fdb913]/40 h-1 rounded-full`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
