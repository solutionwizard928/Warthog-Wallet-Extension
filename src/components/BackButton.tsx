import { IoIosArrowBack } from 'react-icons/io'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function BackButton() {
    const navigator = useNavigate();
    const handleClick = () => {
        navigator(-1)
    }

    return (
        <div>
            <Button onClick={handleClick} variant={'outline'} ariaLabel="Go back" className="h-10 w-10 flex items-center justify-center bg-[#FDB9131A]">
                <IoIosArrowBack className='text-primary text-xl' />
            </Button>
        </div>
    )
}
export default BackButton