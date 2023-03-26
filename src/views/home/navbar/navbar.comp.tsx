import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";
import HomeDropComp from "../modal";
import HomeDropdown from "../dropdown";

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
            {/* <img src="/images/Doow.png" className={styles.imge} /> */}
            <img src="/images/onwhite.png" className={styles.imge} />
            {/* <img src="/images/clogo.png" className={styles.imge} /> */}
            {/* doow */}
          </Link>
        </label>

        <ul className={showNav ? styles.show : ""}>
          <li
            onClick={() => setShowNav(!showNav)}
            className={_path == `/` ? styles.active : ""}
          >
            <Link href={"/"} className={styles.link}>
              Overview
            </Link>
          </li>

          <NavListItem
            name={"Products"}
            setShowNav={() => setShowNav(!showNav)}
            href={"#"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
            dropdownItems={[
              {
                title: "Business Cards",
                href: "#",
              },
              {
                title: "Global Cards",
                href: "#",
              },
              {
                title: "FX",
                href: "#",
              },
              {
                title: "Payment",
                href: "#",
              },
              {
                title: "Spend Management",
                href: "#",
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
              },
              {
                title: "For CFOs",
                href: "#",
              },
              {
                title: "For Employees",
                href: "#",
              },
              {
                title: "For Ecommerce",
                href: "#",
              },
            ]}
          />
          {/* <NavListItem
            name={"Accounting"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/#"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
            dropdownItems={[]}
          /> */}
          <NavListItem
            name={"About"}
            setShowNav={() => setShowNav(!showNav)}
            href={"/about_us"}
            path={_path}
            styleName={styles.link}
            activeStyle={styles.active}
            dropdownItems={[]}
          />
          <li
            onClick={() => setShowNav(!showNav)}
            className={_path == `/login` ? styles.active : ""}
          >
            <Link href={"/dashboard"} className={styles.link}>
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
  dropdownItems: {
    title: string;
    href: string;
  }[];
}

export function NavListItem(props: INavListItem) {
  const [showDropdown, setshowDropdown] = useState(false);
  return (
    <>
      {/* {showDropdown && (
        <HomeDropdown
          heading={"Header me"}
          content={"Content we"}
          onClose={() => {}}
        />
      )} */}
      <li
        onClick={props.setShowNav}
        onMouseEnter={() => setshowDropdown(true)}
        onMouseLeave={() => setshowDropdown(false)}
        className={props.path == props.href ? props.activeStyle : ""}
      >
        <Link href={props.href} className={props.styleName}>
          {props.name}
        </Link>
        <ul className={styles.dropdown}>
          {props.dropdownItems.map((v, i) => (
            <li key={i}>{v.title}</li>
          ))}
        </ul>
      </li>
    </>
  );
}
