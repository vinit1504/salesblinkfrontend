import React, { useState, useEffect } from "react";
import {
  ArrowDownUp,
  ChartColumnDecreasing,
  ChevronDown,
  Rocket,
  RotateCcw,
} from "lucide-react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import ReactFlows from "./../components/ReactFlows";
import { useSelector } from "react-redux";
import axios from "axios";

const Sequence = () => {
  // State for controlling the text and editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Editable Label");
  const [tempText, setTempText] = useState(text);

  // State for storing the sequence data
  const [sequenceData, setSequenceData] = useState(null);

  // Redux selectors to get the necessary data
  const { selectedLists } = useSelector((state) => state.reactFlow);
  const { emailTemplate: body } = useSelector((state) => state.emailFollowup);
  const { sendEmailAs: emailSubject } = useSelector((state) => state.emailFollowup);
  const { waitDuration } = useSelector((state) => state.time);

  // useEffect to load saved sequence data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("sequenceData");
    if (savedData) {
      setSequenceData(JSON.parse(savedData));
      
      
    }
  }, []);

  // Handler to enable editing mode
  const handleEditClick = () => {
    setTempText(text);
    setIsEditing(true);
  };

  // Handler to save the edited text and exit editing mode
  const handleSave = () => {
    setText(tempText);
    setIsEditing(false);
  };

  // Handler to cancel editing and revert back to original text
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handler to save the data and submit it via an API call
  const handleSaveAndSubmit = async () => {
    // Set the wait time by adding the wait duration to the current time
    const waitDateTime = new Date();
    waitDateTime.setSeconds(waitDateTime.getSeconds() + waitDuration);
    const time = waitDateTime.toISOString();

    // Prepare the data to be sent in the email
    const selectedListsString = Array.isArray(selectedLists)
      ? selectedLists.join(", ")
      : selectedLists;

    const data = {
      selectedLists: selectedListsString,
      body,
      time,
      emailSubject,
    };

    console.log("Data to be sent:", data);

    // Send the email via an API call
    try {
      const response = await axios.post(
        // "http://localhost:8080/api/v1/email/send-email",
        "https://salesblinkbackend.vercel.app/api/v1/email/send-email",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Email sent successfully:", response.data);
      alert("Email sent successfully!");

      // Save the sequence data to localStorage after submission
      const sequence = {
        selectedLists: selectedListsString,
        body,
        time,
        emailSubject,
      };
      setSequenceData(sequence);
      localStorage.setItem("sequenceData", JSON.stringify(sequence));
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex-row flex items-center gap-3 justify-between mt-10 mx-auto w-11/12">
        <div className="flex items-center gap-2 p-2 flex-1">
          {isEditing ? (
            // Show input field to edit the label if in editing mode
            <input
              type="text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)} // Update tempText state while editing
              className="border border-gray-300 rounded-md p-2 w-36"
            />
          ) : (
            // Show the label as text if not in editing mode
            <span className="flex gap-10 flex-row text-lg font-medium w-36">
              {text}
            </span>
          )}

          {isEditing ? (
            <>
              {/* Show save and cancel buttons when in editing mode */}
              <FaCheck
                onClick={handleSave}
                className="text-green-500 text-xl cursor-pointer"
                title="Save"
              />
              <FaTimes
                onClick={handleCancel}
                className="text-red-500 text-xl cursor-pointer"
                title="Cancel"
              />
            </>
          ) : (
            // Show edit button when not in editing mode
            <FaEdit
              onClick={handleEditClick}
              className="text-blue-500 text-xl cursor-pointer"
              title="Edit"
            />
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Icons for actions (like rotate, sort, etc.) */}
          <RotateCcw className="w-8 h-8 text-red-500 border-2 border-red-500 p-1 rounded-md hover:text-red-700 hover:border-red-700 transition-all duration-300" />
          <ArrowDownUp className="w-8 h-8 text-purple-500 border-2 border-purple-500 p-1 rounded-md hover:text-purple-700 hover:border-purple-700 transition-all duration-300" />
          <ChartColumnDecreasing className="w-8 h-8 text-blue-500 border-2 border-blue-500 p-1 rounded-md hover:text-blue-700 hover:border-blue-700 transition-all duration-300" />

          {/* Button to save and submit the data */}
          <button
            onClick={handleSaveAndSubmit}  // Submit the data when clicked
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            <span className="font-semibold">Save & Schedule</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ReactFlows component for visualization */}
      <div className="mt-10 w-11/12 mx-auto">
        <ReactFlows />
      </div>

      {/* Display the saved sequence data */}
      {sequenceData && (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Saved Sequence:</h3>
          <pre className="bg-white p-4 rounded-lg border border-gray-300">
            {JSON.stringify(sequenceData, null, 2)}  {/* Format and display saved data */}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Sequence;
