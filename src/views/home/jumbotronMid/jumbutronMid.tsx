import { useRouter } from "next/router";
import { BiCreditCard } from "react-icons/bi";
import { FaAccusoft } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import styles from "./jumbutron.module.scss";

interface IJumbutron {
  title: string;
  subtitle?: string;
  bgColor: string;
}
export const JumbutronMid = (props: IJumbutron) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: props.bgColor }}
    >
      {/* <div className={styles.sectionTitle}>{props.title}</div> */}
      <div className={styles.content}>
        <div>
          <RiBankLine />,
          <p>
            Open multi-currency business accounts without visiting any bank and
            accept payments in USD, NGN, EUR, GBP, and KES via local payment
            methods
          </p>
        </div>
        <div>
          <MdOutlineManageAccounts />,
          <p>
            Manage all your budgets, expenses, approvals, and permissions in one
            place!
          </p>
        </div>
        <div>
          <BiCreditCard />
          <p>
            Create unlimited Master and VISA cards for employees and other
            company expenses such as SAAS subscriptions and bill payments
          </p>
        </div>
      </div>
    </div>
  );
};
