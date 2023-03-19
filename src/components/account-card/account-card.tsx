import Image from "next/image";
import React from "react";
import AvatarGroup from "../avatar/avatar-group";
import styles from "./account-card.module.scss";

interface Props {
  accountName: string;
  balance: string;
  countryFlag: string;
  profileUrls: string[];
}

export const AccountCard: React.FC<Props> = (props) => {
  const { accountName, balance, countryFlag, profileUrls } = props;
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
        <AvatarGroup imageUrls={profileUrls} />
      </div>
    </div>
  );
};

export default AccountCard;
