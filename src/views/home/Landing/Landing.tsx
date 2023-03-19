import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Landing.module.scss";

export const HomeLanding = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      {/* <img src="/images/logo.png" className={styles.imgd} /> */}
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <span>Cross-border banking for African startups and businesses</span>
          {/* <span>Doow It.</span> */}
        </div>

        <p className={styles.smallText}>Let's Doow It..</p>
      </div>
    </div>
  );
};
