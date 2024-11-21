/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedLists } from "../store/reactflow/reactFlowSlice"; // Import action to set selected lists in Redux store
import { X } from "lucide-react"; // Import X icon for closing buttons

// Modal Component to select leads from lists
const LeadsListModal = ({ onClose, onInsert }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input
  const [selectedListsState, setSelectedListsState] = useState([]); // Local state to track selected lists
  const [lists] = useState([ // Hardcoded list of email addresses, can be fetched from an API or database
    "sp3887804@gmail.com",
    "vinit15012003@gmail.com",
  ]);

  const dispatch = useDispatch(); // Redux dispatcher to update the global state

  // Function to add a list to the selected lists state
  const handleAddList = (list) => {
    if (!selectedListsState.includes(list)) { // Check to avoid duplicate entries
      setSelectedListsState((prev) => [...prev, list]); // Add list to selected lists state
    }
  };

  // Function to remove a list from the selected lists state
  const handleRemoveList = (list) => {
    setSelectedListsState((prev) => prev.filter((item) => item !== list)); // Remove the selected list
  };

  // Function to dispatch selected lists to Redux store and close modal
  const handleInsert = () => {
    dispatch(setSelectedLists(selectedListsState)); // Dispatch the selected lists to Redux
    console.log("Selected lists stored in Redux:", selectedListsState); // Log selected lists for debugging

    onClose(); // Close the modal
  };

  return (
    <div>
      {/* Modal Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal Container */}
        <div className="bg-white rounded-lg w-full max-w-[900px] h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="p-6 border-b flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Leads from List(s)
              </h2>
              <p className="text-gray-600 mt-1">
                Connect multiple lists as source for this sequence.
              </p>
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} /> {/* Close icon */}
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="mb-6">
              {/* List Selection Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select your List(s)</h3>
                {/* New List Button */}
                <button className="text-blue-500 font-medium flex items-center bg-white border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50">
                  <span className="mr-2">New List</span>
                  <span className="text-xl">+</span> {/* New list icon */}
                </button>
              </div>

              {/* Searchable Dropdown */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search for a list..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                  className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                />
                {/* Display filtered lists based on the search term */}
                <div className="border rounded-lg mt-2 max-h-48 overflow-y-auto">
                  {lists
                    .filter((list) =>
                      list.toLowerCase().startsWith(searchTerm.toLowerCase()) // Filter lists by search term
                    )
                    .map((list) => (
                      <div
                        key={list}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleAddList(list)} // Add list to selected on click
                      >
                        {list} {/* Display list item */}
                      </div>
                    ))}
                </div>
              </div>

              {/* Display selected lists */}
              <div className="border rounded-lg p-2 min-h-[48px]">
                {selectedListsState.map((list) => (
                  <div
                    key={list}
                    className="inline-flex items-center bg-gray-100 rounded-md px-3 py-1 m-1"
                  >
                    <span className="mr-2">{list}</span> {/* Display the selected list */}
                    {/* Remove selected list */}
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveList(list)}
                    >
                      <X size={16} /> {/* Remove icon */}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Insert Button */}
            <div className="flex justify-end mt-6">
              {/* Insert Button */}
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleInsert} // Dispatch selected lists and close modal on click
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsListModal;
