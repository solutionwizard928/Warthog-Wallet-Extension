import { IoMdTrash } from "react-icons/io";
import useWallet from "../hooks/useWallet";

const NodeCard = ({
    id,
    name,
    address,
    setPrimaryNode,
    removeNode,
}: {
    id: number;
    name: string;
    address: string;
    setPrimaryNode: (id: number) => void;
    removeNode: (id: number) => void;
}) => {
    const { selectedNodeIndex } = useWallet();

    return (
        <>
            <div className={`flex px-2 justify-between items-center w-full mt-6 relative border-l-2 border-[curentColor] ${selectedNodeIndex === id ? 'border-2' : ''}` }>
                <div className="flex items-center gap-4 cursor-pointer" onClick={()=>setPrimaryNode(id)}>
                    {/* <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="profile-image.png"
                        alt={`${name} Profile`}
                    /> */}
                    <div>
                        <div className="text-white text-xl font-semibold">{name}</div>
                        <div className="text-white/50 text-xs">{address}</div>
                    </div>
                </div>
                <IoMdTrash onClick={()=>removeNode(id)} className="w-6 h-6 cursor-pointer"/>
                {/* <div className="flex items-center gap-3">
                    <IoMdTrash />
                </div> */}
            </div>
        </>
    );
};

export default NodeCard;
