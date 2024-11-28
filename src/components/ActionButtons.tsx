import React from 'react';
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ActionButtons: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between w-full gap-5">
            <Button variant="primary" ariaLabel="Send" className="w-full" onClick={() => navigate('/send')}>
                Send
            </Button>
            <Button variant="white" ariaLabel="Receive" className="w-full" onClick={() => navigate('/receive')}>
                Receive
            </Button>
        </div>
    );
};

export default ActionButtons;
