import Link from "next/link";
import React from "react";
import { RateText } from "../text";
import styles from "./trans-info.module.scss";

interface Props {
  rateValue?: number;
  periodText?: string;
  transType: "Money in" | "Money out" | "Pending";
  transAmount: string;
}

export const TransInfoCard: React.FC<Props> = (props) => {
  const { periodText, rateValue, transType, transAmount } = props;

  const getColor = () => {
    switch (transType) {
      case "Money in":
        return "in";

      case "Money out":
        return "out";

      case "Pending":
        return "pending";
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <div className={`${styles.transType} ${styles[getColor()]}`}>
          {transType}
        </div>
        <div className={styles.accountTypeInfo}>
          Account Type{" "}
          <select
            style={{
              border: "none",
              outline: "none",
              color: "#006fff",
              background: "transparent",
            }}
          >
            <option>ALL</option>
          </select>
        </div>
      </div>
      <div className={styles.columnRight}>
        <div>
          <div className={styles.valueText}>${transAmount}</div>
          {periodText && rateValue && (
            <RateText rateValue={rateValue} periodText={periodText} tiny />
          )}
        </div>
        <Link href={"#"}>View all</Link>
      </div>
    </div>
  );
};

export default TransInfoCard;
