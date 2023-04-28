import { ReactNode } from "react";
import { TbArrowsRightLeft } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsBank } from "react-icons/bs";
import { VscHome } from "react-icons/vsc";
import { HiOutlineCalculator } from "react-icons/hi";

// 0703  839 303

interface ISubLink {
  title: string;
  link: string;
}

interface ISidebarItem {
  icon: ReactNode;
  title: string;
  subLinks: ISubLink[];
  callBack?: () => void;
}

export const sideBarItems: ISidebarItem[] = [
  {
    icon: <BsBank />,
    title: "Banking",
    subLinks: [
      {
        title: "Global Accounts",
        link: "/account/dashboard",
      },
      {
        title: "Currency Wallets",
        link: "#",
      },
      {
        title: "Business Cards",
        link: "#",
      },
      {
        title: "Transactions",
        link: "#",
      },
    ],
  },
  {
    icon: <RiMoneyDollarCircleLine />,
    title: "FX & Conversions",
    subLinks: [
      {
        title: "Convert",
        link: "#",
      },
      {
        title: "Treasury",
        link: "#",
      },
    ],
  },
  {
    icon: <TbArrowsRightLeft />,
    title: "Payments",
    subLinks: [
      {
        title: "Payment Buttons",
        link: "#",
      },
      {
        title: "Payment Links",
        link: "#",
      },
      {
        title: "Invoices",
        link: "#",
      },
    ],
  },
  {
    icon: <HiOutlineCalculator />,
    title: "Accounting",
    subLinks: [
      {
        title: "Budgeting",
        link: "#",
      },
      {
        title: "Expense Managemnet",
        link: "#",
      },
      {
        title: "Reporting",
        link: "#",
      },
      {
        title: "Payroll",
        link: "#",
      },
    ],
  },
  {
    icon: <VscHome />,
    title: "Company",
    subLinks: [
      {
        title: "Team",
        link: "#",
      },
      {
        title: "Permissions",
        link: "#",
      },
      {
        title: "Settings",
        link: "#",
      },
    ],
  },
];
