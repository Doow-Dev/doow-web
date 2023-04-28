import { IconButton } from "../../components/buttons";
import styles from "./dashboard.module.scss";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { RateText } from "../../components/text";
import { TransInfoCard } from "../../components/transactions";
import { AccountCard } from "../../components/account-card";
import DashboardNavBar from "./navbar/navbar.comp";
import { useEffect, useLayoutEffect, useState } from "react";
import BankAccountForm from "./create-bank-account/bank-account-form";
import NotificationBanner from "./notification-banner";
// import { SideBar } from "../../comps/sidebar/sidebar";
import { SideBar } from "../../comps/sidebar/sidebar";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../components/loading/loading";
import { useRouter } from "next/router";

interface IAccountCardInfo {
  accountName: string;
  balance: string;
  countryFlag: string;
  profileUrls: string[];
}

const initialAccounts: IAccountCardInfo[] = [
  {
    accountName: "Doow Holdings Inc.",
    balance: "$000, 000",
    countryFlag: "/assets/flags/usa.svg",
    profileUrls: ["/assets/profiles/afro-hair.jpeg"],
  },
  {
    accountName: "Doow Nigeria Ltd",
    balance: "N000,000",
    countryFlag: "/assets/flags/nigeria.png",
    profileUrls: [
      "/assets/profiles/headtie-man.jpeg",
      "/assets/profiles/afro-hair.jpeg",
      "/assets/profiles/spec-man.jpeg",
      "/assets/profiles/spec-man.jpeg",
      "/assets/profiles/spec-man.jpeg",
    ],
  },
  {
    accountName: "Doow Kenya",
    balance: "KES 000,000",
    countryFlag: "/assets/flags/kenya.jpg",
    profileUrls: [
      "/assets/profiles/afro-hair.jpeg",
      "/assets/profiles/spec-man.jpeg",
    ],
  },
  {
    accountName: "SAAS Subscriptions",
    balance: "£000,000",
    countryFlag: "/assets/flags/british.png",
    profileUrls: ["/assets/profiles/afro-hair.jpeg"],
  },
];

export default function DashboardView() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<IAccountCardInfo[]>(initialAccounts);
  const { account, loading } = useAppSelector(
    (state) => state.virtualAccountState
  );
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeForm = () => {
    setOpenForm(false);
    setShowMessage(true);
  };

  const closeMessage = () => {
    setOpenForm(false);
    setShowMessage(false);
    if (account.accountName) {
      accounts.push(account);
    }
  };

  const handleCloseModal = () => {
    setOpenForm(false);
    setOpenModal(false);
  };

  // useEffect(() => {
  //   router.push("/login");
  // }, []);

  return (
    <>
      <DashboardNavBar onToggleMenu={toggleMenu} showMenu={showMenu} />
      <SideBar showMenu={showMenu} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <p className={styles.welcome}>Welcome, Tolani</p>
          <div className={styles.topSection}>
            <div className={styles.topLeft}>
              <RateText rateValue={0} periodText="in the last 7 days" tiny />
              <p className={styles.totalBalance}>$000,000.00</p>
              <p className={styles.currencyInfo}>
                Total available balance in{" "}
                <select
                  style={{
                    border: "none",
                    outline: "none",
                    color: "#006fff",
                    background: "transparent",
                  }}
                >
                  <option>USD</option>
                  <option>NGN</option>
                  <option>KES</option>
                </select>
              </p>
            </div>
            <div className={styles.btnGroup}>
              <IconButton icon={<BsPlusLg />} title="Add money" />
              <IconButton icon={<BsArrowRight />} title="Send money" />
              <IconButton icon={<HiDotsHorizontal />} />
            </div>
          </div>
          {/* middle section */}
          <div className={styles.middleSection}>
            <TransInfoCard
              periodText="in the last 7 days"
              rateValue={0.0001}
              transType="Money in"
              transAmount={"000,000.00"}
            />
            <TransInfoCard
              periodText="compared to last 7 days"
              rateValue={-0.001}
              transType="Money out"
              transAmount={"0,000.00"}
            />
            <TransInfoCard transType="Pending" transAmount={"0,000.00"} />
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.topRow}>
              <div>
                <p>Accounts </p>
                <select
                  style={{
                    border: "none",
                    outline: "none",
                    color: "#006fff",
                    background: "transparent",
                  }}
                >
                  <option>All</option>
                </select>
              </div>
              <div>
                <IconButton
                  icon={<BsArrowRight />}
                  title="Add account"
                  clickHandler={() => {
                    setOpenModal(true);
                    setOpenForm(true);
                  }}
                />
                <IconButton icon={<HiDotsHorizontal />} />
              </div>
            </div>
            <div className={styles.bottomRow}>
              {accounts.map((account, idx) => (
                <AccountCard
                  key={idx}
                  accountName={account.accountName}
                  balance={account.balance}
                  countryFlag={account.countryFlag}
                  profileUrls={account.profileUrls}
                />
              ))}
            </div>
          </div>
        </div>
        {openForm && openModal && (
          <BankAccountForm
            handleCloseForm={closeForm}
            handleCloseModal={handleCloseModal}
          />
        )}
        {showMessage && openModal && (
          <NotificationBanner
            handleCloseForm={closeForm}
            closeMessage={closeMessage}
          />
        )}
        {loading && <Loading />}
      </div>
    </>
  );
}
