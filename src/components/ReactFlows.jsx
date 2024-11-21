/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
  Position,
  Handle,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SourceBlockModal from "./SourceBlockModal";
import AddBlocksPopup from "./AddBlocksPopup";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import Time from "./Time";

import { FaClock } from "react-icons/fa"; // Import clock icon
import Email2Followup from "./Email2Followup";
import CustomNode from "./CustomeNode";

const SequenceFlow = () => {
  // State for storing nodes, edges, and modal/popup visibility
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isPopupOpen3, setIsPopupOpen3] = useState(false);

  // Fetch data from Redux store for selected lists, email template, and wait duration
  const { selectedLists } = useSelector((state) => state.reactFlow);
  const { templateName } = useSelector((state) => state.emailList);
  const { waitDuration } = useSelector((state) => state.time);
  const { waitType } = useSelector((state) => state.time);
  const { emailTemplate } = useSelector((state) => state.emailFollowup);
  const { sendEmailAs } = useSelector((state) => state.emailFollowup);

  // Load nodes and edges from localStorage on page load if available
  useEffect(() => {
    const savedNodes = localStorage.getItem("nodes");
    const savedEdges = localStorage.getItem("edges");
   
    // If data exists in localStorage, set it to state, otherwise use default data
    if (savedNodes && savedEdges) {
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      // Default node and edge data
      const initialNodes = [
        {
          id: "1",
          type: "custom",
          data: {
            label: "+ Add Lead Source",
            isLastNode: false,
          },
          position: { x: 250, y: 50 },
        },
        {
          id: "2",
          type: "custom",
          data: {
            label: "Sequence Start Point",
            isLastNode: false,
          },
          position: { x: 250, y: 170 },
        },
        {
          id: "3",
          type: "custom",
          data: {
            label: "Add Next Step",
            isLastNode: true,
          },
          position: { x: 250, y: 290 },
        },
      ];

      const initialEdges = [
        {
          id: "edge-1-2",
          source: "1",
          target: "2",
          type: "custom",
          animated: true,
        },
        {
          id: "edge-2-3",
          source: "2",
          target: "3",
          type: "custom",
          animated: true,
        },
      ];

      // Set the default nodes and edges
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, []);

  // Save nodes and edges to localStorage whenever they change
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
  }, [nodes, edges]);

  // Function to add a new node
  const addNode = useCallback(() => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isLastNode: false,
        },
      }));

      const lastNode = nds[nds.length - 1];
      const newNodePosition = {
        x: lastNode.position.x,
        y: lastNode.position.y + 120,
      };

      // Get the new node number and set label
      const nodeNumber = nds.length + 1;
      let label = nodeNumber === 3 ? "Email Template" : `Step ${nodeNumber}`;

      const newNode = {
        id: `node-${nodeNumber}`,
        type: "custom",
        data: {
          label: label,
          isLastNode: true,
          onAdd: addNode, // Set the add function to new nodes
        },
        position: newNodePosition,
      };

      // Add the edge to the new node
      setEdges((eds) => [
        ...eds,
        {
          id: `edge-${lastNode.id}-${newNode.id}`,
          source: lastNode.id,
          target: newNode.id,
          type: "custom",
          animated: true,
        },
      ]);

      return [...updatedNodes, newNode]; // Add new node to the state
    });
  }, [setNodes, setEdges]);

  // Handle node clicks to open appropriate modals
  const onNodeClick = (id) => {
    console.log(id, "Node clicked");

    // Open modals based on clicked node id
    if (id === "1") {
      setIsModalOpen(true);
    } else if (id === "3") {
      setIsPopupOpen(true);
    } else if (id === "node-4") {
      setIsPopupOpen2(true);
    } else if (id === "node-5") {
      setIsPopupOpen3(true);
    }
  };

  // Update all nodes with the addNode function as an onAdd prop
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, onAdd: addNode }, // Assign the addNode function to all nodes
      }))
    );
  }, [addNode, setNodes]);

  // Define custom node types
  const nodeTypes = {
    custom: (props) => (
      <CustomNode
        {...props}
        onNodeClick={onNodeClick} // Pass the onNodeClick function to CustomNode
        selectedLists={selectedLists}
        templateName={templateName}
        waitDuration={waitDuration}
        waitType={waitType}
        sendEmailAs={sendEmailAs}
        emailTemplate={emailTemplate}
      />
    ),
  };

  return (
    <div className="w-full h-96 bg-gray-50">
      {/* Render ReactFlow component with nodes, edges, and controls */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>

      {/* Conditional rendering for modals and popups */}
      {isModalOpen && (
        <SourceBlockModal onClose={() => setIsModalOpen(false)} />
      )}
      <AddBlocksPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <Time isOpen={isPopupOpen2} onClose={() => setIsPopupOpen2(false)} />
      <Email2Followup
        isOpen={isPopupOpen3}
        onClose={() => setIsPopupOpen3(false)}
      />
    </div>
  );
};

// Wrapper component to provide ReactFlow context
const FlowWrapper = () => (
  <ReactFlowProvider>
    <SequenceFlow />
  </ReactFlowProvider>
);

export default FlowWrapper;
