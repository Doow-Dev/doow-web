import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import { logout, useAuthDispatch, useAuthState } from "../../context/auth";
import { sidebarItems } from "../sidebar/sidebarItems";

export default function NavBar() {
  const router = useRouter();
  const _path = router.pathname.toString();

  const show = "show";
  const [showNav, setShowNav] = useState(false);

  const dispatch = useAuthDispatch();
  const handleLogout = async () => {
    await logout(dispatch);
  };

  const data = useAuthState();

  return (
    <>
      <div className={styles.navbar}>
        <label className={styles.brand}>
          <Link href="/" className={styles.brand}>
            DOOW
          </Link>
        </label>

        <ul className={showNav ? styles.show : ""}>
          {sidebarItems.map((item, i) => {
            // if (item.agentType.includes(data?.me?.agent_type)) {
            return (
              <Link href={item.link} className={styles.link} key={i}>
                <li
                  className={_path == item.link ? styles.active : ""}
                  key={i}
                  onClick={
                    item.title === "Logout"
                      ? handleLogout
                      : () => setShowNav(!showNav)
                  }
                >
                  {item.title}
                </li>
              </Link>
            );
            // }
          })}
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
