import Link from "next/link";
import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { MdArrowDropDown, MdKeyboardArrowDown } from "react-icons/md";
import styles from "./navbar.module.scss";

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
          <MdArrowDropDown />
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
