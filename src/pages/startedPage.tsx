import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function StartedPage() {
    const navigate = useNavigate();

    return (
        <div className="container h-screen">
            <div className='flex justify-center items-center h-[75%]'>
                <img src="/fullLogo.png" alt="WARTHOG NETWORK" />
            </div>
            <div className='flex-col flex gap-3 justify-center h-[25%]'>
                <Button onClick={() => navigate('/intro')} variant={'primary'} ariaLabel="Create a new wallet" className="w-full">
                    Create a new wallet
                </Button>
                <Button onClick={() => navigate('/import')} variant={'outline'} ariaLabel="Import an existing wallet" className="w-full">
                    Import an existing wallet
                </Button>
            </div>
        </div>
    )
}
export default StartedPage