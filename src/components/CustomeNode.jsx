import { Handle, Position } from "@xyflow/react";
import { FaClock, FaUserPlus } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

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
  // Retrieve local storage data
  const storedItems = JSON.parse(localStorage.getItem("storedItems")) || []; // Replace "storedItems" with your key

  return (
    <div
      className={`relative p-4 ${
        data.isLastNode ? "bg-transparent" : "bg-white border border-gray-300"
      } rounded-lg w-52 text-center`}
      onClick={() => onNodeClick(id)}
    >
      {data.isLastNode ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="w-8 h-8 border-2 border-blue-400 text-blue-400 rounded flex items-center justify-center hover:bg-blue-50 transition-colors"
            onClick={data.onAdd}
          >
            <span className="text-xl leading-none">+</span>
          </button>
        </div>
      ) : (
        <>
          <Handle type="target" position={Position.Top} />
          <div className="relative mx-auto flex justify-center items-center">
            {id === "1" && selectedLists.length > 0 ? (
              <div className="flex items-center space-x-2">
                <FaUserPlus className="text-red-500" size={20} />
                <ul className="text-left">
                  {selectedLists.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : id === "2" && storedItems.length > 0 ? (
              <div className="text-left space-y-1">
                <span className="font-medium text-gray-700">Stored Items:</span>
                <ul>
                  {storedItems.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : id === "3" ? (
              <div className="flex items-center space-x-2">
                <HiMail className="text-blue-500" size={20} />
                <span className="text-sm font-medium text-gray-700">
                  {templateName || "Email Template"}
                </span>
              </div>
            ) : id === "node-4" ? (
              <div className="flex flex-row gap-3 items-center space-y-1">
                <FaClock className="text-gray-500 w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">Delay</span>
                  <div className="text-sm font-medium text-gray-700">
                    {waitDuration} {waitType}
                  </div>
                </div>
              </div>
            ) : id === "node-5" ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <HiMail className="text-blue-500" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    {emailTemplate || "Email Template"}
                  </span>
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
export default CustomNode