import { useRouter } from "next/router";
import { GlobalLinks } from "../../../helper/links";
import styles from "./Landing.module.scss";

export const HomeLanding = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>All-in-one finance and spend management for startups and corporates</h1>
          {/* <span>Doow It.</span> */}
        </div>

        <div className={styles.bottomDiv}>
          <p className={styles.smallText}>
            Be the first to get early access when we launch beta!
          </p>
          <div
            className={styles.btn}
            onClick={() => router.push(GlobalLinks.home.waitlist)}
          >
            Get early access
          </div>
        </div>
      </div>
    </div>
  );
};
