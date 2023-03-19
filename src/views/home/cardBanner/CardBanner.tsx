import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./CardBanner.module.scss";

export const CardBanner = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>Pay anywhere in any currency</h1>
        </div>

        <div className={styles.bottomDiv}>
          <p className={styles.smallText}>
            One-time and recurring payments in multiple currencies, wherever
            VISA or Mastercard is accepted worldwide.
          </p>
          <p className={styles.smallText}>
            Create a debit card for your employees, for teams, for each new
            project, for each recurring SAAS subscription, for each vendor. You
            can even create a debit card for fun—literally whatever you want.
          </p>
          <p className={styles.smallText}>
            Real-time control over all your virtual and physical cards, so you
            can set spend policies and limits, monitor expenses, and even freeze
            or delete cards in a few clicks.
          </p>
          <div className={styles.btn}>Join the waitlist</div>
        </div>
      </div>
    </div>
  );
};
