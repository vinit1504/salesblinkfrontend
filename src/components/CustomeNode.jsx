import { Handle, Position } from "@xyflow/react";
import { FaClock, FaUserPlus } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useState, useCallback } from "react";

const CustomNode = ({
  data,
  id,
  onNodeClick,
  selectedLists,
  templateName,
  waitDuration,
  waitType,
  emailTemplate,
  sendEmailAs,
}) => {
  const [localStorageData, setLocalStorageData] = useState(null);

  // Load data from localStorage only once by checking if it's already loaded
  if (localStorageData === null) {
    const savedData = localStorage.getItem("sequenceData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalStorageData(parsedData);
      } catch (error) {
        console.error("Error parsing sequenceData from localStorage:", error);
      }
    }
  }

  // Parse selectedLists safely
  const selectedListsToDisplay =
    typeof localStorageData?.selectedLists === "string"
      ? [localStorageData.selectedLists]
      : Array.isArray(localStorageData?.selectedLists)
      ? localStorageData.selectedLists
      : [];
  const bodyToDisplay =
    typeof localStorageData?.body === "string"
      ? [localStorageData.body]
      : Array.isArray(localStorageData?.body)
      ? localStorageData.body
      : [];
  const timeToDisplay =
    typeof localStorageData?.time === "string"
      ? [localStorageData.time]
      : Array.isArray(localStorageData?.time)
      ? localStorageData.time
      : [];
  const emailSubjectToDisplay =
    typeof localStorageData?.emailSubject === "string"
      ? [localStorageData.emailSubject]
      : Array.isArray(localStorageData?.emailSubject)
      ? localStorageData.emailSubject
      : [];

  // Use useCallback to prevent function recreation
  const handleNodeClick = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent propagation
      if (onNodeClick) onNodeClick(id);
    },
    [onNodeClick, id]
  );

  const handleAddClick = useCallback(
    (e) => {
      e.stopPropagation(); // Prevent triggering parent div's onClick
      if (data.onAdd) data.onAdd();
    },
    [data.onAdd]
  );

  return (
    <div
      className={`relative p-4 ${
        data.isLastNode ? "bg-transparent" : "bg-white border border-gray-300"
      } rounded-lg w-52 text-center`}
      onClick={handleNodeClick}
    >
      {data.isLastNode ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="w-8 h-8 border-2 border-blue-400 text-blue-400 rounded flex items-center justify-center hover:bg-blue-50 transition-colors"
            onClick={handleAddClick}
          >
            <span className="text-xl leading-none">+</span>
          </button>
        </div>
      ) : (
        <>
          <Handle type="target" position={Position.Top} />
          <div className="relative mx-auto flex justify-center items-center">
            {id === "1" && selectedListsToDisplay.length > 0 ? (
              <div className="flex items-center space-x-2">
                <FaUserPlus className="text-red-500" size={20} />
                <ul className="text-left">
                  {selectedListsToDisplay.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : id === "3" ? (
              <div className="flex items-center space-x-2">
                <HiMail className="text-blue-500" size={20} />
                <ul className="text-left">
                  {bodyToDisplay.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-medium text-gray-700">
                  {templateName || "Email Template"}
                </span>
              </div>
            ) : id === "node-4" ? (
              <div className="flex flex-row gap-3 items-center space-y-1">
                <FaClock className="text-gray-500 w-5 h-5" />
                <div className="flex flex-col">
                <ul className="text-left">
                  {timeToDisplay.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
                  <div className="text-sm font-medium text-gray-700">
                    {waitDuration} {waitType}
                  </div>
                </div>
              </div>
            ) : id === "node-5" ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <HiMail className="text-blue-500" size={20} />
                  <ul className="text-left">
                  {emailSubjectToDisplay.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Send Email As
                  </span>
                  <span className="text-sm text-gray-700">
                    {sendEmailAs || "Not Provided"}
                  </span>
                </div>
              </div>
            ) : (
              <div>{data.label}</div>
            )}
          </div>
          <Handle type="source" position={Position.Bottom} />
        </>
      )}
    </div>
  );
};

export default CustomNode;
