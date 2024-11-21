/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmailTemplate, setSendEmailAs } from './../store/emailFollow2/emailFollow2.js'; // Import the actions

// Component to handle Email Status popup/modal
const EmailStatus = ({ isOpen, onClose }) => {
  // If the modal is not open, return null (no rendering)
  if (!isOpen) return null;

  // Redux dispatch function to dispatch actions to the store
  const dispatch = useDispatch();
  
  // Accessing the current email template and sendEmailAs values from Redux state
  const { emailTemplate, sendEmailAs } = useSelector((state) => state.emailFollowup);

  // Dummy Data for the available email templates and options for "Send Email As"
  const emailTemplates = ['Template 1', 'Template 2', 'Template 3'];
  const sendEmailAsOptions = ['RE: Follow Up', 'RE: Inquiry', 'RE: Thanks'];

  // Local state to track if the Insert button should be enabled
  const [canInsert, setCanInsert] = useState(false);

  // Handle the change in Email Template selection
  const handleEmailTemplateChange = (event) => {
    dispatch(setEmailTemplate(event.target.value)); // Dispatch selected template to Redux
  };

  // Handle the change in Send Email As selection
  const handleSendEmailAsChange = (event) => {
    dispatch(setSendEmailAs(event.target.value)); // Dispatch selected email option to Redux
  };

  // Effect to check if both fields (emailTemplate and sendEmailAs) are filled
  useEffect(() => {
    // Enable the "Insert" button only if both fields are filled
    if (emailTemplate && sendEmailAs) {
      setCanInsert(true);
    } else {
      setCanInsert(false); // Disable button if any of the fields are empty
    }
  }, [emailTemplate, sendEmailAs]);

  // Handle the click event for Insert button
  const handleInsertClick = () => {
    // Log or dispatch actions as needed
    console.log('Inserting Email Template:', emailTemplate, 'Send Email As:', sendEmailAs);
    // Dispatch further actions or make API calls if necessary
    onClose(); // Close the modal after the insertion
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg h-[90vh]">
        {/* Header with title and close button */}
        <div className="flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Cold Email</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Instruction text */}
          <p className="text-gray-600">Send an email to a lead.</p>

          {/* Email Template Selection Section */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Email Template</label>
                <button className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                  <span>New Template</span>
                  <span className="text-lg">⊕</span> {/* Button to create a new template */}
                </button>
              </div>
              <div className="relative">
                <select
                  value={emailTemplate}
                  onChange={handleEmailTemplateChange}
                  className="w-full p-2 border rounded-lg appearance-none bg-white pr-8"
                >
                  <option>Search for an Email Template</option>
                  {/* Render available email templates */}
                  {emailTemplates.map((template, index) => (
                    <option key={index} value={template}>
                      {template}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span> {/* Dropdown arrow */}
                </div>
              </div>
            </div>

            {/* Send Email As Selection Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Send Email As</label>
              <div className="relative">
                <select
                  value={sendEmailAs}
                  onChange={handleSendEmailAsChange}
                  className="w-full p-2 border rounded-lg appearance-none bg-white pr-8"
                >
                  {/* Render options for "Send Email As" */}
                  {sendEmailAsOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span> {/* Dropdown arrow */}
                </div>
              </div>
            </div>

            {/* Information Message */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600 italic">
              <p>Since you are sending the email as "{sendEmailAs}",</p>
              <p>Subject Line of this template will be ignored & follow-up email will be sent in same thread as a reply to the last email.</p>
            </div>

            {/* Insert Button */}
            {canInsert && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleInsertClick}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Insert {/* Button to insert the email template */}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStatus;
