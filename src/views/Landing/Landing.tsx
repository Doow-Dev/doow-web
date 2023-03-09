import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Landing.module.scss";
import LandingNavBar from "./navbar/navbar.comp";

export const HomeLanding = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      <LandingNavBar />
      <img src="/images/logo.png" className={styles.imgd} />
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <span>APC </span>
          <span>E-Membership</span>
        </div>

        <p className={styles.smallText}>Welcome to DOOW.</p>
      </div>
    </div>
  );
};
