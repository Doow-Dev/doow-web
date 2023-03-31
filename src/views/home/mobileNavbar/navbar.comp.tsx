import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import MobileProductsSideBar from "./products";
import MobileUseCaseSideBar from "./usecase";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import NavFooter from "./NavFooter";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileSideBar(props: IProps) {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [showInnerSec, setInnerSec] = useState({
    activeTab: "CLOSE",
  });
  const width = 500;

  return (
    <>
      <motion.div
        animate={{ x: props.isOpen ? 0 : -width }}
        initial={{ x: -500 }}
        transition={{ duration: 0.01, type: "spring" }}
        className={styles.navbar}
      >
        <div className={styles.listContainer}>
          {/* <p onClick={() => props.onClose()}>Close</p> */}

          <div onClick={() => setInnerSec({ activeTab: "PRODUCTS" })}>
            <p>Products</p>
            <MdKeyboardArrowRight />
          </div>
          <div onClick={() => setInnerSec({ activeTab: "SOLUTIONS" })}>
            Solutions
            <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.sliderItem}
            onClick={() => router.push("/login")}
          >
            Login
          </div>
        </div>
        <NavFooter />
      </motion.div>
      {showInnerSec.activeTab === "PRODUCTS" && (
        <MobileProductsSideBar
          onClose={() => setInnerSec({ activeTab: "CLOSE" })}
          isOpen={props.isOpen}
        />
      )}
      {showInnerSec.activeTab === "SOLUTIONS" && (
        <MobileUseCaseSideBar
          isOpen={props.isOpen}
          onClose={() => setInnerSec({ activeTab: "CLOSE" })}
        />
      )}
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
