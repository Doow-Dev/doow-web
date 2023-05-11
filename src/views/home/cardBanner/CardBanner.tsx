import { useRouter } from "next/router";
import { GlobalLinks } from "../../../helper/links";
import { JoinWaitlistBlack } from "../JoinBtn/JoinWaitlist";
import styles from "./CardBanner.module.scss";

export const CardBanner = () => {
  const router = useRouter();

  return (
    <div id="home" className={styles.container}>
      <div className={styles.preContent}>
        <div className={styles.content}>
          <div className={styles.sectionTitle}>
            <h1>Pay anywhere in any currency</h1>
          </div>

          <div className={styles.bottomDiv}>
            <p className={styles.smallText}>
              You can make one-time and recurring payments in multiple
              currencies anywhere VISA or Mastercard is accepted.
            </p>
            <p className={styles.smallText}>
              Create unlimited debit cards for your employees, for teams, for
              SAAS subscriptions, and for vendors. You can even create a debit
              card for fun—literally whatever you want.
            </p>
            <p className={styles.smallText}>
              You have real-time control over all company cards, so you can set
              spend policies and limits, monitor expenses, and even freeze or
              delete cards.
            </p>
            <div
              className={styles.btnClick}
              onClick={() => router.push(GlobalLinks.home.waitlist)}
            >
              <JoinWaitlistBlack
                title="Get early access"
                href={GlobalLinks.home.waitlist}
                fontColor={"dark"}
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
