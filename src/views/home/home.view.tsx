import { IconButton } from "../../components/buttons";
import { SideBar } from "../../comps/sidebar/sidebar";
import LandingNavBar from "../Landing/navbar/navbar.comp";
import styles from "./home.module.scss";
import { FaPlus } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { RateText } from "../../components/text";
import { TransInfoCard } from "../../components/transactions";
import { AccountCard } from "../../components/account-card";

export default function HomeView() {
  return (
    <>
      <SideBar />
      <LandingNavBar />
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.topSection}>
            <div className={styles.topLeft}>
              <RateText rateValue={25} periodText="in the last 7 days" tiny />
              <p className={styles.totalBalance}>$570,000.00</p>
              <p className={styles.currencyInfo}>Total available balance in </p>
            </div>
            <div className={styles.btnGroup}>
              <IconButton icon={<FaPlus />} title="Add money" />
              <IconButton icon={<FaPlus />} title="Send money" />
              <IconButton icon={<HiDotsHorizontal />} />
            </div>
          </div>
          {/* middle section */}
          <div className={styles.middleSection}>
            <TransInfoCard
              periodText="in the last 7 days"
              rateValue={27}
              transType="Money in"
              transAmount={"151,900.00"}
            />
            <TransInfoCard
              periodText="compared to last 7 days"
              rateValue={-56}
              transType="Money out"
              transAmount={"2,000.00"}
            />
            <TransInfoCard transType="Pending" transAmount={"2,000.00"} />
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.topRow}>
              <div>
                <p>Accounts </p>
                <span>All</span>
              </div>
              <div>
                <IconButton icon={<FaPlus />} title="Add account" />
                <IconButton icon={<HiDotsHorizontal />} />
              </div>
            </div>
            <div className={styles.bottomRow}>
              <AccountCard
                accountName="Doow Holdings Inc."
                balance={"$370, 000"}
                countryFlag={'/assets/flags/usa.svg'}
                profileImg={'/assets/profiles/afro-hair.jpeg'}
              />
              <AccountCard
                accountName="Doow Holdings Inc."
                balance={"N70,000,000"}
                countryFlag={'/assets/flags/nigeria.png'}
                profileImg={'/assets/profiles/afro-hair.jpeg'}
              />
              <AccountCard
                accountName="Doow Holdings Inc."
                balance={"KES 990,000"}
                countryFlag={'/assets/flags/kenya.jpg'}
                profileImg={'/assets/profiles/afro-hair.jpeg'}
              />
              <AccountCard
                accountName="Doow Holdings Inc."
                balance={"£165,000"}
                countryFlag={'/assets/flags/british.png'}
                profileImg={'/assets/profiles/afro-hair.jpeg'}
              />
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
