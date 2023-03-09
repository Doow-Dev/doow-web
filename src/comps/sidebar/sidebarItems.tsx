import { ReactNode } from "react";
import { BiDollar, BiHelpCircle, BiLogOutCircle } from "react-icons/bi";
import { BsChatTextFill } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { IoDocument, IoNotifications } from "react-icons/io5";
import { MdDashboard, MdOutlineAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { Member_Type } from "../../generated/graphql";

interface ISidebarItem {
  icon: ReactNode;
  title: string;
  link: string;
  callBack?: () => void;
  agentType: Array<Member_Type>;
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

  // ! Chat Section
  //* FOR State Admin
  // {
  //   icon: <BsChatTextFill />,
  //   title: "Chat",
  //   link: "/chat",
  //   agentType: [Member_Type.State],
  // },
  {
    icon: <TiGroup />,
    title: "Congress",
    link: "/congress",
    agentType: [Member_Type.State],
  },
  {
    icon: <BsChatTextFill />,
    title: "Convention",
    link: "/convention",
    agentType: [Member_Type.State],
  },
  {
    icon: <IoDocument />,
    title: "Forms",
    link: "/forms",
    agentType: [Member_Type.State],
  },
  {
    icon: <MdDashboard />,
    title: "Dashboard",
    link: "/dashboard",
    agentType: [Member_Type.State],
  },
  {
    icon: <BiHelpCircle />,
    title: "Help",
    link: "/help",
    agentType: [Member_Type.State],
  },
  {
    icon: <BiLogOutCircle />,
    title: "Logout",
    link: "/#",
    agentType: [Member_Type.State, Member_Type.National],
  },
];
