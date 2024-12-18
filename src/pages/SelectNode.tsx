import { useEffect, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import useWallet from "../hooks/useWallet";
import NodeCard from "../components/NodeCard";

interface NodeType {
    id: number,
    name: string,
    address: string,
}

function SelectNode() {
    const { nodeList, selectedNodeIndex, setSelectedNodeIndex, setNodeList } = useWallet();
    
    const [nodes, setNodes] = useState<NodeType[]>([] as NodeType[]);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    const [newNodeAddress, setNewNodeAddress] = useState("");
    const [warnning, setWarnning] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNodes = nodes.filter(
        (node) =>
            (
                node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                node.address.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const setPrimaryNode = (id: number) => {
        console.log("Primary Node Set");
        setSelectedNodeIndex(id);
    }

    const removeNode = (id: number) => {
        const len = nodeList.length;
        setNodeList(nodeList.filter((_, index) => index !== id));
        if( selectedNodeIndex === len - 1 )
            setSelectedNodeIndex( Math.max(len - 2, 0) );
    }


    const handleAddNode = () => {
        // Logic to add the new node
        console.log("Adding node:", newNodeAddress);
        if( newNodeAddress.length == 0 ){
            setWarnning(true);
            return ;
        }

        const len = nodeList.length;
        setNodeList([...nodeList, newNodeAddress])
        setSelectedNodeIndex(len);

        // Reset the input and close the dialog
        setNewNodeAddress("");
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setNewNodeAddress("");
        setIsDialogOpen(false);
    }

    useEffect(() => {
        if (nodeList.length == 0) {
            console.log(`**** no supported nodes:`, nodeList.length);
        }
        else {
            setNodes(nodeList.map((node, index) => ({
                id: index,
                name: `Node ${index + 1}`,
                address: node,
            })))
        }
    }, [nodeList])

    return (
        <div className="min-h-screen container relative px-4">
            <Header title="Select an Node" />
            <div className="relative w-full">
                <input
                    className="h-14 w-full pl-12 pr-4 py-2 bg-primary/10 rounded-full border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    src="icons/search-icon.svg"
                    alt="Search Icon"
                />
            </div>
            <div className="h-[63vh] overflow-y-scroll">
                {filteredNodes.length > 0 ? (
                    filteredNodes.map((node, index) => (
                        <NodeCard
                            key={index}
                            {...node}
                            setPrimaryNode={setPrimaryNode}
                            removeNode={removeNode}
                        />
                    ))
                ) : (
                    <div className="text-center text-white/50 mt-6">No nodes found</div>
                )}
            </div>
            <div className="absolute bottom-3 w-full left-0 px-4">
                <Button
                    variant="primary"
                    ariaLabel="Add Node"
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full"
                >
                    + Add more nodes
                </Button>
            </div>
            {/* Popup Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#1A1A1A] p-4 rounded shadow-lg w-[300px]">
                        <h3 className="text-white text-xl font-semibold mb-4">Add new Node</h3>
                        <input
                            type="text"
                            placeholder="Node Address"
                            value={newNodeAddress}
                            onChange={(e) => setNewNodeAddress(e.target.value)}
                            className="w-full min-w-[150px] bg-[#2A2A2A] border border-primary/25 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                        />
                        {
                            warnning && <p className="text-red-500 text-xs mt-1">You have to input node address</p>
                        }
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="secondary"
                                onClick={handleCancel} // Close dialog
                                className="mr-2 w-full"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleAddNode} // Add node
                                className="w-full"
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectNode;
