import { useRouter } from "next/router";
import styles from "./Landing.module.scss";

export const WaitlistLanding = () => {
  const router = useRouter();

  return (
    <div id="about" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>Waitlist</h1>
          {/* <span>Doow It.</span> */}
        </div>

        <div className={styles.bottomDiv}>
          <p className={styles.smallText}>
            Be the first to get early access when we launch beta!
          </p>
        </div>
      </div>
    </div>
  );
};
