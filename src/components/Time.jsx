import React, { useState } from 'react';
import { X } from "lucide-react";
import WaitConfigDialog from "./WaitConfigDialog";

const Time = ({ isOpen, onClose }) => {
  // State to manage the opening of the WaitConfigDialog
  const [waitDialogOpen, setWaitDialogOpen] = useState(false);

  // If both the main dialog and Wait dialog are closed, return null (render nothing)
  if (!isOpen && !waitDialogOpen) return null;

  // Define the blocks (actions, conditions, other actions) that will be displayed in the dialog
  const blocks = {
    actions: [
      {
        icon: "📧", // Icon for "Cold Email"
        title: "Cold Email", // Title of the action
        description: "Send an email to a lead.", // Description of the action
        category: "actions", // Category of this block
        bgColor: "bg-purple-100", // Background color for styling
      },
      {
        icon: "✓", // Icon for "Task"
        title: "Task", // Title of the action
        description: "Schedule a manual task.", // Description of the action
        category: "actions",
        bgColor: "bg-purple-100",
      },
    ],
    conditions: [
      {
        icon: "⌛", // Icon for "Wait"
        title: "Wait", // Title of the condition
        description: "Add a delay between blocks.", // Description of the condition
        category: "conditions",
        bgColor: "bg-gray-100", // Background color for styling
        onClick: () => {
          // Close the main dialog and open the WaitConfigDialog
          onClose();
          setWaitDialogOpen(true);
        },
      },
      {
        icon: "🔍", // Icon for "If/Else (Rules)"
        title: "If/Else (Rules)",
        description: "Route leads through the sequence based on events.",
        category: "conditions",
        bgColor: "bg-white",
      },
      {
        icon: "🔀", // Icon for "A/B Split"
        title: "A/B Split",
        description: "Equally split contacts into two separate flows.",
        category: "conditions",
        bgColor: "bg-white",
      },
    ],
    otherActions: [
      {
        icon: "📋", // Icon for "Move Lead to List"
        title: "Move Lead to List",
        description: "",
        category: "otherActions",
        bgColor: "bg-white",
      },
      {
        icon: "📦", // Icon for "Archive Lead"
        title: "Archive Lead",
        description: "",
        category: "otherActions",
        bgColor: "bg-white",
      },
      {
        icon: "❌", // Icon for "End Sequence"
        title: "End Sequence",
        description: "Terminate the current sequence.",
        category: "otherActions",
        bgColor: "bg-red-100",
      },
      {
        icon: "🚫", // Icon for "Unsubscribe Lead"
        title: "Unsubscribe Lead",
        description: "Remove the lead from further sequences.",
        category: "otherActions",
        bgColor: "bg-yellow-100",
      },
    ],
  };

  // Handle clicks outside the dialog (backdrop) to close the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Only render the main dialog if it's open and the WaitConfigDialog is not open
  const renderMainDialog = isOpen && !waitDialogOpen;

  return (
    <>
      {/* Main dialog is rendered only if the modal is open and WaitConfigDialog is closed */}
      {renderMainDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick} // Close the modal when clicking outside
        >
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Add Blocks</h2>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full">
                  <span className="sr-only">Help</span>ⓘ
                </button>
              </div>
              <button
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                onClick={onClose} // Close the modal when clicking on the close button
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-600 mb-6">
                Click on a block to configure and add it in sequence.
              </p>

              {/* Actions Section */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {blocks.actions.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:border-blue-500"
                      onClick={block.onClick} // Trigger the block's onClick action
                    >
                      <div className={`p-2 ${block.bgColor} rounded-lg`}>
                        <span className="text-2xl">{block.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{block.title}</h3>
                        <p className="text-gray-600 text-sm">{block.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Conditions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {blocks.conditions.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:border-blue-500"
                      onClick={block.onClick} // Trigger the block's onClick action
                    >
                      <div className={`p-2 ${block.bgColor} rounded-lg`}>
                        <span className="text-2xl">{block.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{block.title}</h3>
                        <p className="text-gray-600 text-sm">{block.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Actions Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {blocks.otherActions.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:border-blue-500"
                      onClick={block.onClick} // Trigger the block's onClick action
                    >
                      <div className={`p-2 ${block.bgColor} rounded-lg`}>
                        <span className="text-2xl">{block.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{block.title}</h3>
                        {block.description && (
                          <p className="text-gray-600 text-sm">{block.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WaitConfigDialog is rendered when waitDialogOpen state is true */}
      <WaitConfigDialog 
        isOpen={waitDialogOpen} 
        onClose={() => setWaitDialogOpen(false)} // Close the WaitConfigDialog when the onClose is triggered
      />
    </>
  );
};

export default Time;
