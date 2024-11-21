/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import downlaod from "./../assets/download.png";
import { navigation } from "./../config/navigation";
import download from './../assets/download.png';

// Utility function to combine class names based on condition
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [activeTab, setActiveTab] = useState(""); // State to track the currently active tab
  const [expandedTab, setExpandedTab] = useState(null); // State to track which tab's subitems are expanded
  const location = useLocation(); // Hook to get the current URL path

  // Function to handle when a tab is clicked
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Set the active tab
  };

  // Function to toggle the expanded state of a subheader
  const handleToggleSubHeader = (tabName) => {
    setExpandedTab(expandedTab === tabName ? null : tabName); // Toggle the expanded tab
  };

  // Hook to set the active tab based on the current URL path
  useEffect(() => {
    // Find the matching navigation item based on the current URL path
    const currentTab = navigation.find(
      (item) =>
        location.pathname === item.href ||
        (item.subItems &&
          item.subItems.some((subItem) => location.pathname === subItem.path))
    );

    // Set the active tab name based on the found item or default to "OutReach"
    setActiveTab(currentTab ? currentTab.name : "OutReach");
  }, [location.pathname]); // Re-run this effect when the URL path changes

  return (
    <Disclosure as="nav" className="bg-white ">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-10">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          {/* Logo and main navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={downlaod} className="h-8 w-auto" />
            </div>
            {/* Desktop navigation links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => handleTabClick(item.name)}
                    className={classNames(
                      item.name === activeTab
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-[18px] font-medium flex flex-row items-center gap-3 "
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Notification and Profile dropdown */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notifications Button */}
            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown menu */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile"
                    src={downlaod}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              {/* Menu items for profile */}
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu and SubHeader */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure key={item.name}>
              {({ open }) => (
                <>
                  <DisclosureButton
                    as={Link}
                    to={item.href}
                    onClick={() => {
                      handleTabClick(item.name);
                      handleToggleSubHeader(item.name);
                    }}
                    aria-current={item.name === activeTab ? "page" : undefined}
                    className={classNames(
                      item.name === activeTab
                        ? "bg-indigo-500 text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </DisclosureButton>
                  {/* Display subitems if the tab is expanded */}
                  {expandedTab === item.name && item.subItems && (
                    <DisclosurePanel className="pl-4">
                      <div>
                        {item.subItems.map((subItem, index) => (
                          <DisclosureButton
                            key={index}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            <Link
                              to={subItem.path}
                              className="font-semibold px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 text-[16px]"
                              onClick={() => {
                                setExpandedTab(null); // Collapse the subheader on click
                              }}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          </DisclosureButton>
                        ))}
                      </div>
                    </DisclosurePanel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
