import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdOutlineManageAccounts } from "react-icons/md";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { RiBankLine, RiOrganizationChart } from "react-icons/ri";
import {
  BiArrowBack,
  BiArrowFromLeft,
  BiArrowToLeft,
  BiArrowToRight,
  BiCreditCard,
  BiShoppingBag,
} from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import { HiOutlineCurrencyDollar, HiOutlineUserGroup } from "react-icons/hi";
import { VscDebugDisconnect } from "react-icons/vsc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavListItem } from "./nav_list_tem";

interface IProducts {
  onClose: () => void;
}

export default function MobileUseCaseSideBar(props: IProducts) {
  const router = useRouter();
  const _path = router.pathname.toString();

  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className={styles.productNav}>
        <div className={styles.listContainer}>
          <p onClick={() => props.onClose()}>
            <MdKeyboardArrowLeft />
            Menu
          </p>
          <div className={styles.navlist}>
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
                  title: "For CFOs",
                  href: "#",
                  subtitle: `
                  Boost financial growth with data and automated approvals for controllers, budgets etc.
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
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.innerButtons}>
            <div className="btn">Sign in</div>
            <div className="btn">Sign up</div>
          </div>
          <div className="btn">Get early access</div>
        </div>
      </div>
    </>
  );
}
