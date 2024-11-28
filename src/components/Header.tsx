import React from 'react';
import BackButton from '../components/BackButton';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <div className="justify-center items-center gap-6 inline-flex relative w-full my-2 pb-2 h-12">
        <div className="absolute left-2">
            <BackButton />
        </div>
        <p className="text-center text-white text-base font-semibold capitalize leading-tight max-w-64">{title}</p>
    </div>
);

export default Header;