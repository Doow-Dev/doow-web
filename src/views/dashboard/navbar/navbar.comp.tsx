import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";

interface Props {
  onToggleMenu: () => void;
  showMenu: boolean;
}

export const DashboardNavBar: React.FC<Props> = ({
  onToggleMenu,
  showMenu,
}) => {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [user, setUser] = useState(null);
  const show = "show";
  // console.log("Path -", _path);
  return (
    <>
      <div className={styles.navbar}>
        <label className={styles.brand}>
          <Link href="/" className={styles.brand}>
            doow
          </Link>
        </label>

        <label className={styles.icon}>
          {showMenu ? (
            <FaTimes onClick={onToggleMenu} />
          ) : (
            <FaBars onClick={onToggleMenu} />
          )}
        </label>
      </div>
    </>
  );
};

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

export default DashboardNavBar;
