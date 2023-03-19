import Image from "next/image";
import React from "react";
import styles from "./account-card.module.scss";

interface Props {
  accountName: string;
  balance: string;
  countryFlag: string;
  profileImg: string;
}

export const AccountCard: React.FC<Props> = (props) => {
  const { accountName, balance, countryFlag, profileImg } = props;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p className={styles.accountName}>{accountName}</p>
        <Image
          src={countryFlag}
          width={32}
          height={20}
          alt="country-flag"
          className={styles.flag}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.balance}>Bal: {balance}</p>
        <Image
          src={profileImg}
          width={25}
          height={25}
          alt="profile-pic"
          className={styles.profileImg}
        />
      </div>
    </div>
  );
};

export default AccountCard;
