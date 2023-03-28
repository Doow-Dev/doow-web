import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import MobileProductsSideBar from "./products";
import MobileUseCaseSideBar from "./usecase";
import { MdKeyboardArrowRight } from "react-icons/md";

interface IProps {
  onClose: () => void;
}
export default function MobileSideBar(props: IProps) {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [showInnerSec, setInnerSec] = useState({
    activeTab: "CLOSE",
  });
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.listContainer}>
          {/* <p onClick={() => props.onClose()}>Close</p> */}
          <div className={styles.sliderItem}>Get access</div>
          <div onClick={() => setInnerSec({ activeTab: "PRODUCTS" })}>
            <p>Products</p>
            <MdKeyboardArrowRight />
          </div>
          <div onClick={() => setInnerSec({ activeTab: "SOLUTIONS" })}>
            Solutions
            <MdKeyboardArrowRight />
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
      {showInnerSec.activeTab === "PRODUCTS" && (
        <MobileProductsSideBar
          onClose={() => setInnerSec({ activeTab: "CLOSE" })}
        />
      )}
      {showInnerSec.activeTab === "SOLUTIONS" && (
        <MobileUseCaseSideBar
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
