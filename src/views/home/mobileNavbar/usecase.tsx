import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { MdKeyboardArrowLeft, MdOutlineManageAccounts } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { NavListItem } from "./nav_list_tem";
import NavFooter from "./NavFooter";

interface IProducts {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileUseCaseSideBar(props: IProducts) {
  const router = useRouter();
  const _path = router.pathname.toString();
  const width = 800;
  const [showNav, setShowNav] = useState(false);
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
        <NavFooter />
      </motion.div>
    </>
  );
}
