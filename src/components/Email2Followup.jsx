import { useState } from "react";
import EmailStatus from "./EmailStatus";
import { CheckCircle, Filter, Mail, Network, X } from "lucide-react";

// Main component for adding blocks to a sequence
const Email2Followup = ({ isOpen, onClose }) => {
    // State to manage cold email popup visibility
    const [isColdEmailOpen, setIsColdEmailOpen] = useState(false);
    
    // Render nothing if both popups are closed
    if (!isOpen && !isColdEmailOpen) return null;
  
    // Handler to close the main popup
    const handleClose = () => {
      onClose();
    };
  
    // Handler to open cold email popup and close main popup
    const handleColdEmailClick = () => {
      setIsColdEmailOpen(true);
      onClose();
    };
  
    // Handler to close cold email popup
    const handleColdEmailClose = () => {
      setIsColdEmailOpen(false);
    };
  
    return (
      <>
        {/* Main popup overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 50 }}>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg h-[90vh]">
              {/* Popup header with title and close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">Add Blocks</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700 rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ⓘ
                  </button>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Popup content area */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Click on a block to configure and add it in sequence.
                </p>
      
                <div className="space-y-6">
                  {/* Outreach Section with configurable blocks */}
                  <section>
                    <h3 className="text-lg font-medium mb-4">Outreach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Cold Email block */}
                      <div 
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={handleColdEmailClick}
                      >
                        <div className="flex gap-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Mail className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Cold Email</h4>
                            <p className="text-sm text-gray-600">Send an email to a lead.</p>
                          </div>
                        </div>
                      </div>
      
                      {/* Task block */}
                      <div 
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => console.log('Task clicked')}
                      >
                        <div className="flex gap-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Task</h4>
                            <p className="text-sm text-gray-600">Schedule a manual task.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
      
                  {/* Conditions Section with routing options */}
                  <section>
                    <h3 className="text-lg font-medium mb-4">Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* If/Else (Rules) block */}
                      <div 
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => console.log('If/Else clicked')}
                      >
                        <div className="flex gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Filter className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">If/Else (Rules)</h4>
                            <p className="text-sm text-gray-600">Route leads through the sequence based on events.</p>
                          </div>
                        </div>
                      </div>
      
                      {/* A/B Split block */}
                      <div 
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => console.log('A/B Split clicked')}
                      >
                        <div className="flex gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Network className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">A/B Split</h4>
                            <p className="text-sm text-gray-600">Equally split contacts into two separate flows.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Conditional rendering of Cold Email Status popup */}
        {isColdEmailOpen && (
          <EmailStatus 
            isOpen={isColdEmailOpen}
            onClose={handleColdEmailClose}
          />
        )}
      </>
    );
  };
  
export default Email2Followup;