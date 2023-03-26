import React from "react";
import styles from "./rate-text.module.scss";

interface Props {
  rateValue: number;
  periodText: string;
  tiny?: boolean;
}
export const RateText: React.FC<Props> = (props) => {
  const { periodText, rateValue, tiny } = props;
  return (
    <div className={`${styles.rateContainer} ${tiny ? styles.small : ""}`}>
      <p className={`${styles.rate} ${rateValue < 0 ? styles.red : ""}`}>
        {rateValue > 0 ? "+" : ""}
        {rateValue}%
      </p>
      <p className={styles.period}>{periodText}</p>
    </div>
  );
};

export default RateText;
