/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { UserPlus, Zap, X, Users } from "lucide-react";
import LeadsListModal from "./LeadsListModal"; // Import the LeadsListModal component

// SourceBlockModal component is responsible for displaying the source block configuration modal
const SourceBlockModal = ({ onClose }) => {
  const [activeModal, setActiveModal] = useState("sourceBlock"); // Track the active modal to control what content is displayed

  // Function to close the SourceBlockModal and trigger the passed onClose function if provided
  const closeSourceBlockModal = () => {
    setActiveModal(null); // Close the SourceBlockModal
    if (onClose) onClose(); // Trigger the onClose prop if provided
  };

  return (
    <>
      {/* Render the SourceBlockModal when activeModal is 'sourceBlock' */}
      {activeModal === "sourceBlock" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg w-full max-w-[800px] h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add a Source Block
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Pick a block & configure, any new leads that match rules
                    will be added to sequence automatically.
                  </p>
                </div>
                {/* Close button to exit the modal */}
                <button
                  onClick={closeSourceBlockModal} // Close the SourceBlockModal when clicking close
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sources</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Each source option is clickable to set the source of leads */}
                <div
                  className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer"
                  onClick={() => setActiveModal("leadsList")} // Switch to LeadsList modal when clicked
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <UserPlus className="text-pink-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Leads from List(s)
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Connect multiple lists as source for this sequence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Another source option for segmenting lists */}
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Users className="text-pink-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Segment of List
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Create a segment of leads which match SalesBlink
                        Variables.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Option to pull leads from CRM Integration */}
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Zap className="text-pink-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Lead from CRM Integration
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Pulls leads from your CRM integrations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Another option for CRM integration */}
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Zap className="text-pink-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Lead from CRM Integration
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Pulls leads from your CRM integrations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render the LeadsListModal when activeModal is 'leadsList' */}
      {activeModal === "leadsList" && (
        <LeadsListModal onClose={closeSourceBlockModal} />
      )}
    </>
  );
};

export default SourceBlockModal;
