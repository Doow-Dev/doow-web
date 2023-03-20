import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";

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
            {/* <img src="/images/hlogo.png" className={styles.imge} /> */}
            {/* <img src="/images/clogo.png" className={styles.imge} /> */}
            doow
          </Link>
        </label>

        <ul className={showNav ? styles.show : ""}>
          <NavListItem
            name={"Accounting"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/accounting"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
          />
          <NavListItem
            name={"Banking"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/banking"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
          />
          <NavListItem
            name={"Products"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/products"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
          />
          <li
            onClick={() => setShowNav(!showNav)}
            className={_path == `/login` ? styles.active : ""}
          >
            <Link href={"/login"} className={styles.link}>
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
}

export function NavListItem(props: INavListItem) {
  return (
    <li
      onClick={props.setShowNav}
      className={props.path == props.href ? props.activeStyle : ""}
    >
      <Link href={props.href} className={props.styleName}>
        {props.name}
      </Link>
    </li>
  );
}
