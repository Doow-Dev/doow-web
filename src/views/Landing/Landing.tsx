import Image from "next/image";
import { useRouter } from "next/router";
import { SideBar } from "../../comps/sidebar/sidebar";
import styles from "./Landing.module.scss";
import LandingNavBar from "./navbar/navbar.comp";

export const HomeLanding = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      <LandingNavBar />
      <SideBar />
      <img src="assets/icons/doowlogo-circle.png" className={styles.imgd} />
      <div className={styles.content}>
        <p className={styles.smallText}>Welcome to DOOW.</p>
      </div>
    </div>
  );
};
