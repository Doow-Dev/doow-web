import Link from "next/link";
import { useState } from "react";
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
        <div className={styles.header}>
          <Link href={props.href}>{props.name}</Link>
        </div>
        <ul>
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
