import { ReactNode } from "react";
import { BiDollar, BiHelpCircle, BiLogOutCircle } from "react-icons/bi";
import { BsChatTextFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { IoDocument, IoNotifications } from "react-icons/io5";
import { MdDashboard, MdOutlineAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

interface ISidebarItem {
  icon: ReactNode;
  title: string;
  link: string;
  callBack?: () => void;
  agentType: any;
}

export const sidebarItems: Array<ISidebarItem> = [
  {
    icon: <MdOutlineAccountCircle />,
    title: "Profile",
    link: "/profile",
    agentType: [],
  },
  {
    icon: <BiDollar />,
    title: "Dues",
    link: "/dues",
    agentType: [],
  },
  {
    icon: <IoNotifications />,
    title: "Notifications",
    link: "/notifications",
    agentType: [],
  },
  {
    icon: <FaMoneyBill />,
    title: "Donate",
    link: "/donate",
    agentType: [],
  },
];
