import styles from "./sidebar.module.scss";
import Link from "next/link";
import { sideBarItems } from "./sidebar-items";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";


interface Props {
  showMenu: boolean;
}

export const SideBar: React.FC<Props> = ({ showMenu }) => {
  // const [showMenu, setShowMenu] = useState<boolean>(false);

  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const route = useRouter();

  // const toggleMenu = () => {
  //   setShowMenu((prev) => !prev);
  // };

  const toggleShowLinks = (i: number) => {
    setActiveLink(i);
    setShowLinks(true);
  };

  return (
    <div className={`${styles.sidebar_menu} ${showMenu ? styles.active : ""}`}>
      <div className={styles.sidebar}>
        <div className={styles.links}>
          {sideBarItems.map((item, i) => (
            <div
              className={`${styles.link} ${
                showLinks && activeLink === i ? styles.active : ""
              }`}
              key={i}
            >
              {item.icon}
              <div className={styles.content}>
                <Link href={"#"} >
                  <p className={styles.header}>
                    {item.title}
                    <TfiAngleUp />
                  </p>
                </Link>
                <div className={styles.sub_menu}>
                  {item.subLinks.map((link, idx) => (
                    <Link key={idx} href={link.link} onClick={() => toggleShowLinks(i)}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.logoSection}>
          <Image
            src={"/assets/icons/doowlogo-circle.png"}
            width={30}
            height={30}
            alt={"doow-logo"}
            onClick={() => route.push("/")}
          />
          <div className={styles.logoInfo}>
            <div>
              <p>Doow Inc.</p>
              <TfiAngleDown />
            </div>
            <span>Abisoye Tolani</span>
          </div>
        </div>
      </div>
    </div>
  );
};
