/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, Link } from "react-router-dom";

// Importing icons for tabs
import {
  FaRegEnvelope,
  FaListAlt,
  FaTasks,
  FaRegChartBar,
  FaRegFileAlt,
  FaCogs,
} from "react-icons/fa";
import { VscSend } from "react-icons/vsc";

const SubHeader = () => {
  // Get the current location (pathname) from the URL
  const location = useLocation();

  // Define the tabs with their names, icons, and corresponding paths
  const tabs = [
    { name: "Sequence", icon: <VscSend className="w-5 h-5 font-bold" />, path: "/outreach" },
    { name: "Outbox", icon: <FaTasks />, path: "/outreach/outbox" },
    { name: "List", icon: <FaListAlt />, path: "/outreach/list" },
    { name: "Task", icon: <FaTasks />, path: "/outreach/task" },
    { name: "Reports", icon: <FaRegChartBar />, path: "/outreach/reports" },
    { name: "Templates", icon: <FaRegFileAlt />, path: "/outreach/templates" },
    {
      name: "Email Sender",
      icon: <FaRegEnvelope />,
      path: "/outreach/email-sender",
    },
    { name: "Settings", icon: <FaCogs />, path: "/outreach/settings" },
  ];

  // Function to render the content based on the current path
  const renderContent = () => {
    const path = location.pathname; // Get the current path

    // Check if the path includes "/outreach" to render the Outreach-related tabs
    if (path.includes("/outreach")) {
      return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <ul className="flex space-x-6">
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                  path === tab.path // Check if the current tab path matches the active path
                    ? "bg-gray-300 text-black" // Apply active state styles
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {/* Render the tab icon */}
                <span className="flex-shrink-0">{tab.icon}</span>
                {/* Render the tab name as a Link */}
                <Link to={tab.path} className="text-gray-700 font-medium">
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    } 
    // If the path includes "/inbox", render the Inbox tab content
    else if (path.includes("/inbox")) {
      return (
        <div>
          <h2>Inbox Tab</h2>
        </div>
      );
    } 
    // If the path includes "/meet", render the Meet tab content
    else if (path.includes("/meet")) {
      return (
        <div>
          <h2>Meet Tab</h2>
        </div>
      );
    } 
    // If the path includes "/dashboard", render the Dashboard tab content
    else if (path.includes("/dashboard")) {
      return (
        <div>
          <h2>Dashboard Tab</h2>
        </div>
      );
    } 
    // Default return if no matching path is found
    else {
      return (
        <div>
          {/* No content rendered for unknown paths */}
        </div>
      );
    }
  };

  // Render the SubHeader only for screens larger than 'xs' (extra small)
  return <div className=" px-6 hidden xs:block">{renderContent()}</div>;
};

export default SubHeader;
