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
                    onClick={() => console.log("Add Node")}
                    className="w-full"
                >
                    + Add more nodes
                </Button>
            </div>
        </div>
    );
}

export default SelectNode;
