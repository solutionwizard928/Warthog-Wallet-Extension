import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


function Validate() {
    const navigate = useNavigate();

    return (
        <div className="h-screen container relative">
            <Header title="Let's double-check" />
            <div className="flex-col justify-start items-start gap-5 inline-flex mt-2">
                <p className="self-stretch text-center text-white text-sm font-medium leading-tight">
                    Well done. Now let's verify that you've written down your recovery phrase correctly. Yes, it's that important.
                </p>
            </div>


            <div className="absolute bottom-5 left-0 px-6 w-full">
                <Button
                    variant={"primary"}
                    ariaLabel="Continue"
                    className="w-full mt-5"
                    onClick={() => {
                        navigate("/validate-intro");
                    }}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default Validate;
