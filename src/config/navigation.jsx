/* eslint-disable no-unused-vars */
import React from "react";
import { CalendarIcon, Gauge, Inbox, SendHorizontal } from "lucide-react";
import { VscSend } from "react-icons/vsc";
import {
  FaTasks,
  FaListAlt,
  FaRegChartBar,
  FaRegFileAlt,
  FaRegEnvelope,
  FaCogs,
} from "react-icons/fa";

export const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    current: false,
    icon: <Gauge className="h-5 w-5" />,
    subItems: [],  
  },
  {
    name: "OutReach",
    href: "/outreach",
    current: false,
    icon: <SendHorizontal className="h-5 w-5" />,
    subItems: [
      {
        name: "Sequence",
        icon: <VscSend className="w-5 h-5 font-bold" />,
        path: "/outreach",  
      },
      {
        name: "Outbox",
        icon: <FaTasks />,
        path: "/outreach/outbox",
      },
      {
        name: "List",
        icon: <FaListAlt />,
        path: "/outreach/list",
      },
      {
        name: "Task",
        icon: <FaTasks />,
        path: "/outreach/task",
      },
      {
        name: "Reports",
        icon: <FaRegChartBar />,
        path: "/outreach/reports",
      },
      {
        name: "Templates",
        icon: <FaRegFileAlt />,
        path: "/outreach/templates",
      },
      {
        name: "Email Sender",
        icon: <FaRegEnvelope />,
        path: "/outreach/email-sender",
      },
      {
        name: "Settings",
        icon: <FaCogs />,
        path: "/outreach/settings",
      },
    ],
  },
  {
    name: "Inbox",
    href: "/inbox",
    current: false,
    icon: <Inbox className="h-5 w-5" />,
    subItems: [
      {
        name: "Messages",
        path: "/inbox/messages",  
      },
      {
        name: "Notifications",
        path: "/inbox/notifications",
      },
    ],
  },
  {
    name: "Meet",
    href: "/meet",
    current: false,
    icon: <CalendarIcon className="h-5 w-5" />,
    subItems: [
      {
        name: "Upcoming",
        path: "/meet/upcoming", 
      },
      {
        name: "History",
        path: "/meet/history",
      },
    ],
  },
];
