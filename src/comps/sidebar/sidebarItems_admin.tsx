import { ReactNode } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { Member_Type } from "../../generated/graphql";

interface ISidebarItem {
  icon: ReactNode;
  title: string;
  link: string;
  callBack?: () => void;
  agentType: Array<Member_Type>;
}

export const sidebarItemsAdmin: Array<ISidebarItem> = [
  {
    icon: <MdOutlineAccountCircle />,
    title: "Permissions",
    link: "/permissions",
    agentType: [],
  },
  {
    icon: <MdOutlineAccountCircle />,
    title: "ADMIN",
    link: "/agent_manager",
    agentType: [Member_Type.State],
  },

  {
    icon: <TiGroup />,
    title: "Candidates",
    link: "/candidates",
    agentType: [Member_Type.State],
  },

  {
    icon: <TiGroup />,
    title: "Manager",
    link: "/agent_manager/",
    agentType: [],
  },
];
