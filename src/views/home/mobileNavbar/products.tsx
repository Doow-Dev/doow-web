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
import { motion } from "framer-motion";
import { NavListItem } from "./nav_list_tem";
import NavFooter from "./NavFooter";

interface IProducts {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileProductsSideBar(props: IProducts) {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [showNav, setShowNav] = useState(false);
  const width = 800;
  return (
    <>
      <motion.div
        animate={{ x: props.isOpen ? 0 : -width }}
        initial={{ x: -500 }}
        transition={{ duration: 1, type: "spring" }}
        className={styles.productNav}
      >
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
                  Hold 40+ currencies and access 24/7 competitive rates, convert between liquid and illiquid pairs, settle fast in your preferred currency
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
          </div>
        </div>
        <NavFooter />
      </motion.div>
    </>
  );
}
