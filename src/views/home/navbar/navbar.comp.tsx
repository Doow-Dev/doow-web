import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { RiBankLine, RiOrganizationChart } from "react-icons/ri";
import { BiCreditCard, BiShoppingBag } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import { HiOutlineCurrencyDollar, HiOutlineUserGroup } from "react-icons/hi";
import { VscDebugDisconnect } from "react-icons/vsc";
import MobileSideBar from "../mobileNavbar/navbar.comp";
import { NavListItem } from "./NavItem";
import { GlobalLinks } from "../../../helper/links";

export default function LandingNavBar() {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [user, setUser] = useState(null);
  const show = "show";
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      {/* {showNav && ( */}
      <MobileSideBar onClose={() => setShowNav(false)} isOpen={showNav} />
      {/* )} */}
      <div className={styles.navbar}>
        <label className={styles.bran}>
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
                title: "Corporate Cards",
                href: "#",
                subtitle: `
                Unlimited corporate & employee cards available everywhere
                `,
                icon: <BiCreditCard />,
              },
              {
                title: "Foreign Business Accounts",
                href: "#",
                subtitle: `
                 Checking, HYSA, and other local and global business accounts without paperwork
                `,
                icon: <RiBankLine />,
              },
              {
                title: "Fx & Conversions",
                href: "#",
                subtitle: `
                 Hold 40+ currencies and access 24/7 rates, convert between liquid and illiquid pairs, settle fast in your preferred currency
                `,
                icon: <IoSwapVerticalOutline />,
              },
              {
                title: "Global Payments",
                href: "#",
                subtitle: `
                  ACH, Wires, SWIFT, SEPA, MoMo, Bacs, and other global payment methods 
                `,
                icon: <HiOutlineCurrencyDollar />,
              },
              {
                title: "Spend Management",
                href: "#",
                subtitle: `
                 Approve, automate and manage all company spend in one place
                `,
                icon: <MdOutlineManageAccounts />,
              },
              {
                title: "Connections",
                href: "#",
                subtitle: `
                 Integrate with your existing banks, card providers and finance tools
                `,
                icon: <VscDebugDisconnect />,
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
                icon: <RiOrganizationChart />,
              },
              {
                title: "For CFOs & Controllers",
                href: "#",
                subtitle: `
                  Boost financial growth with real-time data and automated approvals
                `,
                icon: <MdOutlineManageAccounts />,
              },
              {
                title: "For Managers",
                href: "#",
                subtitle: `
                  Manage team-level spend, policies and permissions
                `,
                icon: <BsPersonPlus />,
              },
              {
                title: "For Employees",
                href: "#",
                subtitle: `
                 Spend within set company limits, policies and be accountable
                `,
                icon: <HiOutlineUserGroup />,
              },
              {
                title: "For Ecommerce",
                href: "#",
                subtitle: `
                  Receive payments from your customers anywhere in the world, then 
                  settle and hold in any currency
                `,
                icon: <BiShoppingBag />,
              },
            ]}
          />

          <li
            onClick={() => setShowNav(!showNav)}
            className={_path == `${GlobalLinks.home.blog}` ? styles.active : ""}
          >
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={GlobalLinks.home.blog}
              className={styles.link}
            >
              Blog
            </Link>
          </li>
          <li
            onClick={() => setShowNav(!showNav)}
            className={
              _path == `${GlobalLinks.auth.login}` ? styles.active : ""
            }
          >
            <Link href={GlobalLinks.auth.login} className={styles.link}>
              Login
            </Link>
          </li>

          <li
            onClick={() => setShowNav(!showNav)}
            className={
              _path == `${GlobalLinks.home.waitlist}` ? styles.active : ""
            }
          >
            <Link href={GlobalLinks.home.waitlist} className={styles.linkBtn}>
              Get early access
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
