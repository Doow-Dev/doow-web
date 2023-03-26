import { useRouter } from "next/router";
import styles from "./Landing.module.scss";

export const AboutUsLanding = () => {
  const router = useRouter();

  return (
    <div id="about" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>Manage all your business' finance in one place</h1>
          {/* <span>Doow It.</span> */}
        </div>

        <div className={styles.bottomDiv}>
          <p className={styles.smallText}>
            Be the first to get early access when we launch beta!
          </p>
          {/* <div className={styles.btn} onClick={() => router.push("waitlist")}>
            Join the waitlist
          </div> */}
        </div>
      </div>
    </div>
  );
};
