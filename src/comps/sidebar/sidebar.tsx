import styles from "./sidebar.module.scss";
import Link from "next/link";
import { logout, useAuthDispatch, useAuthState } from "../../context/auth";
import { sidebarItems } from "./sidebarItems";

export const SideBar = () => {
  const dispatch = useAuthDispatch();
  const handleLogout = async () => {
    await logout(dispatch);
  };

  const data = useAuthState();

  return (
    <div className={styles.sidebar}>
      <Link href="/">
        <h3>DOOW</h3>
      </Link>
      <ul>
        {sidebarItems.map((item, i) => {
          // if (item.agentType.includes(data?.me?.agent_type)) {
          return (
            <Link href={item.link} key={i}>
              <li
                className={styles.styles}
                key={i}
                onClick={item.title === "Logout" ? handleLogout : () => {}}
              >
                <span>{item.icon}</span>
                {item.title}
              </li>
            </Link>
          );
          // }
        })}
      </ul>
    </div>
  );
};
