import React from 'react';
import Button from "../components/Button";

const ActionButtons: React.FC = () => (
    <div className="flex justify-between w-full gap-5">
        <Button variant="primary" ariaLabel="Send" className="w-full" onClick={() => console.log('Send')}>
            Send
        </Button>
        <Button variant="white" ariaLabel="Receive" className="w-full" onClick={() => console.log('Receive')}>
            Receive
        </Button>
    </div>
);

export default ActionButtons;
