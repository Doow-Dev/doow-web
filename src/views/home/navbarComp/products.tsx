import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { MdKeyboardArrowLeft, MdOutlineManageAccounts } from "react-icons/md";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { RiBankLine } from "react-icons/ri";
import { BiCreditCard } from "react-icons/bi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { VscDebugDisconnect } from "react-icons/vsc";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavListItem } from "./nav_list_tem";

interface IProducts {
  onClose: () => void;
}

export default function MobileProductsSideBar(props: IProducts) {
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
              name={"Products"}
              setShowNav={() => setShowNav(!showNav)}
              href={"#"}
              path={_path}
              styleName={styles.link}
              activeStyle={styles.active}
              dropdownItems={[
                {
                  title: "Cooperate cards",
                  href: "#",
                  subtitle: `
                Unlimited corporate & employee cards available everywhere
                `,
                  icon: <BiCreditCard />,
                },
                {
                  title: "Foreign business accounts",
                  href: "#",
                  subtitle: `
                 Checking, HYSA, and other local and global business accounts without paperwork
                `,
                  icon: <RiBankLine />,
                },
                {
                  title: "Fx & conversions",
                  href: "#",
                  subtitle: `
                  Avoid high exchange rates & transfer fees
                `,
                  icon: <IoSwapVerticalOutline />,
                },
                {
                  title: "Global payments",
                  href: "#",
                  subtitle: `
                  ACH, wires, SWIFT, and other global payment methods 
                `,
                  icon: <HiOutlineCurrencyDollar />,
                },
                {
                  title: "Spend management",
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
