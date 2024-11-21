import BackButton from "../components/BackButton"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'

function Info() {
    const navigator = useNavigate();
    return (
        <div className="container h-screen py-5 relative">
            <BackButton />
            <div className="flex flex-col mt-5 gap-5">
                <h3 className="text-xl text-center font-semibold text-white">
                    First, let's create your <br />
                    recovery phrase
                </h3>
                <p className="text-sm font-medium text-center text-white">
                    A recovery phrase is a series of 12 words in a specific order.
                    This word combination is unique to your wallet. Make sure
                    to have pen and paper ready so you can write it down.
                </p>
            </div>
            <div className='absolute bottom-5 left-0 px-6 w-full'>
                <Button onClick={() => navigator('/confirm')} variant={'primary'} ariaLabel="Continue" className="w-full">
                    Continue
                </Button>
            </div>
        </div >
    )
}
export default Info