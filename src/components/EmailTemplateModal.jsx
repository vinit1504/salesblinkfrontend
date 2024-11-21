/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailTemplate } from './../store/emailtemp/emailTemplate'; // Import the setEmailTemplate action
import { X, Plus } from 'lucide-react'; // Importing icons for the modal header

const EmailTemplateModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); // Dispatch function to trigger Redux actions
  const { templateName } = useSelector((state) => state.emailList); // Get the current template name from Redux store
  const [searchTerm, setSearchTerm] = useState(''); // Local state for search input to filter templates

  // If the modal is not open, return null to not render anything
  if (!isOpen) return null;

  // Predefined templates list (can be replaced by dynamic data)
  const templates = [
    { id: 1, name: 'Sample Template (added by SalesBlink)' },
    { id: 2, name: 'Sample Template - Follow Up (added by SalesBlink)' }
  ];

  // Handle selecting a template from the list
  const handleTemplateSelect = (template) => {
    console.log(`Selected: ${template.name}`); // Log the selected template (for debugging)
    dispatch(setEmailTemplate(template.name)); // Dispatch the action to update the selected template in Redux store
  };

  // Handle the insertion of the selected template (i.e., close the modal and handle the template usage)
  const handleInsert = () => {
    if (templateName) {
      onClose(); // Close the modal if a template is selected
    }
  };

  // Filter templates based on the search term entered by the user
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) // Perform case-insensitive search
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh]">
        {/* Modal header with a close button */}
        <div className="flex justify-between items-start p-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Cold Email</h2>
            <p className="text-sm text-gray-600 mt-1">Send an email to a lead.</p>
          </div>
          <button
            onClick={onClose} // Close the modal when the button is clicked
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" /> {/* Close icon */}
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Label and New Template Button */}
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Email Template
              </label>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-md hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" /> {/* Add new template icon */}
                New Template
              </button>
            </div>

            {/* Search input to filter templates */}
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for an Email Template"
                value={templateName || searchTerm} // If a template is selected, show the template name, otherwise show search term
                onChange={(e) => {
                  setSearchTerm(e.target.value); // Update the search term on input change
                  dispatch(setEmailTemplate('')); // Clear the selected template name when searching
                }}
              />
            </div>

            {/* List of filtered templates based on search term */}
            <div className="mt-2 border rounded-md divide-y">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)} // Select the template on click
                >
                  <p className="text-sm text-gray-700">{template.name}</p>
                </div>
              ))}
            </div>

            {/* Display Insert button if a template is selected */}
            {templateName && (
              <button
                onClick={handleInsert} // Insert the selected template and close the modal
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Insert
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateModal;
