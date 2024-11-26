import Header from "../components/Header";

interface Props {
    wallet: string | null;
}

const CopyButton = () => (
    <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-center w-16 h-16 bg-[#f1f1f1] rounded-full cursor-pointer">
            <img src="icons/Icon-copy.svg" alt="Copy" />
        </div>
        <div className="text-center text-white text-sm font-light">Copy</div>
    </div>
);

function ReceivePage({ wallet }: Props) {
    return (
        <div className="min-h-screen container mx-auto px-4">
            <Header title="Receive" />
            <div className="bg-gray-800 p-5 rounded-lg border border-primary/50 flex flex-col items-center gap-5 mt-5">
                <div className="flex flex-col items-center gap-6">
                    <img src="qrCode.png" alt="QR Code to receive payment" className="w-32 h-32" />
                    <div className="text-white text-sm font-light">{wallet}</div>
                </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-8">
                <div>
                    <p className="text-center text-white text-sm font-light">
                        Send only Warthog (Wart) to this address.
                    </p>
                    <p className="w-96 text-center text-white text-sm font-light">
                        Sending any other coins may result in permanent loss.
                    </p>
                </div>

                <div className="flex justify-center gap-12">
                    <CopyButton />
                </div>
            </div>
        </div>
    );
}

export default ReceivePage;
