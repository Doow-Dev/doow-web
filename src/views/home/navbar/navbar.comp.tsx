import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";
import HomeDropComp from "../modal";
import HomeDropdown from "../dropdown";
import { IconType } from "react-icons/lib";
import {
  MdEngineering,
  MdGroup,
  MdIntegrationInstructions,
  MdManageAccounts,
  MdMoney,
  MdPayments,
} from "react-icons/md";
import { IoIdCardSharp } from "react-icons/io5";
import { RiGlobalFill, RiTeamFill } from "react-icons/ri";
import { BiCard, BiCreditCard, BiShoppingBag } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";

export default function LandingNavBar() {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [user, setUser] = useState(null);
  const show = "show";
  const [showNav, setShowNav] = useState(false);
  // console.log("Path -", _path);
  return (
    <>
      <div className={styles.navbar}>
        <label className={styles.brand}>
          <Link href="/" className={styles.brand}>
            {/* <img src="/images/Doow.png" className={styles.imge} /> */}
            <img src="/images/onwhite.png" className={styles.imge} />
            {/* <img src="/images/clogo.png" className={styles.imge} /> */}
            {/* doow */}
          </Link>
        </label>

        <ul className={showNav ? styles.show : ""}>
          <NavListItem
            name={"Products"}
            setShowNav={() => setShowNav(!showNav)}
            href={"#"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
            dropdownItems={[
              {
                title: "Global Cards",
                href: "#",
                subtitle: `
                 Checking, HYSA, and other local and global business accounts without paperwork. 
                `,
                icon: <BiCreditCard />,
              },
              {
                title: "Global Accounts",
                href: "#",
                subtitle: `
                 Checking, HYSA, and other local and global business accounts without paperwork. 
                `,
                icon: <RiGlobalFill />,
              },
              {
                title: "Fx & Conversions",
                href: "#",
                subtitle: `
                  Avoid high exchange rates & transfer fees
                `,
                icon: <BsCurrencyDollar />,
              },
              {
                title: "Payment",
                href: "#",
                subtitle: `
                  ACH, wires, SWIFT, and other global payment methods 
                `,
                icon: <MdPayments />,
              },
              {
                title: "Expense Management",
                href: "#",
                subtitle: `
                 Approve, automate and manage all company spend in one place
                `,
                icon: <MdMoney />,
              },
              {
                title: "Connections",
                href: "#",
                subtitle: `
                 Integrate with your existing banks, card providers and finance tools
                `,
                icon: <MdIntegrationInstructions />,
              },
            ]}
          />
          <NavListItem
            name={"Solutions"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/#"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
            dropdownItems={[
              {
                title: "For CEOs",
                href: "#",
                subtitle: `
                  Complete picture of your global finance lifecycle
                `,
                icon: <MdManageAccounts />,
              },
              {
                title: "For CFOs",
                href: "#",
                subtitle: `
                  Accelerate financial growth with real-time data and automated approvals
                `,
                icon: <RiTeamFill />,
              },
              {
                title: "For Managers",
                href: "#",
                subtitle: `
                  Manage team-level spend, policies and permissions
                `,
                icon: <MdGroup />,
              },
              {
                title: "For Employees",
                href: "#",
                subtitle: `
                 Spend within set company limits, policies and be accountable
                `,
                icon: <MdGroup />,
              },
              {
                title: "For Ecommerce",
                href: "#",
                subtitle: `
                  Receive payments from your customers anywhere in the world.
                `,
                icon: <BiShoppingBag />,
              },
            ]}
          />

          <li
            onClick={() => setShowNav(!showNav)}
            className={_path == `/login` ? styles.active : ""}
          >
            <Link href={"/dashboard"} className={styles.link}>
              Login
            </Link>
          </li>
        </ul>

        <label className={styles.icon}>
          {showNav ? (
            <FaTimes onClick={() => setShowNav(!showNav)} />
          ) : (
            <FaBars onClick={() => setShowNav(!showNav)} />
          )}
        </label>
      </div>
    </>
  );
}

interface INavListItem {
  name: string;
  setShowNav: () => void;
  href: string;
  path: string;
  styleName: string;
  activeStyle: string;
  dropdownItems: {
    title: string;
    subtitle: string;
    icon: JSX.Element;
    href: string;
  }[];
}

export function NavListItem(props: INavListItem) {
  const [showDropdown, setshowDropdown] = useState(false);
  return (
    <>
      <li
        onClick={() => setshowDropdown(!showDropdown)}
        className={props.path == props.href ? props.activeStyle : ""}
      >
        <Link href={props.href} className={props.styleName}>
          {props.name}
        </Link>
        <ul className={showDropdown ? "" : styles.dropdown}>
          {props.dropdownItems.map((v, i) => (
            <li key={i}>
              <div>
                {v.icon}
                <h3 onClick={props.setShowNav}>{v.title}</h3>
              </div>
              <p>{v.subtitle}</p>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}
