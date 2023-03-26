import React, { useState } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

export default function FooterHome() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.linkList}>
          <div className={styles.brand}>
            {/* doow */}
            <img src="/images/ongreen.png" className={styles.imge} />
          </div>
          <ul>
            <li className={styles.listheader}>Products</li>
            <li className={styles.listItems}>Business Cards</li>
            <li className={styles.listItems}>Global Cards</li>
            <li className={styles.listItems}>Payments</li>
            <li className={styles.listItems}>Fx</li>
            <li className={styles.listItems}>Spend management</li>
          </ul>
          <ul>
            <li className={styles.listheader}>Company</li>
            <li
              className={styles.listItems}
              onClick={() => router.push("/about_us")}
            >
              About Us
            </li>
            <li
              className={styles.listItems}
              onClick={() => router.push("/contact_us")}
            >
              Contact Us
            </li>
          </ul>
          <div className={styles.address}>
            <p>Doow Inc.</p>
            <p>1736, 1007 N Orange St. 4th Floor,</p>
            <p>Wilmington, DE, New Castle,</p>
            <p>United States, 19801</p>
            <p>Contact: Email us at @support@doow.co</p>
          </div>
        </div>
        <div className={styles.copywright}>
          <p>© copyright All rights reserved</p>
        </div>
        <div className={styles.shortText}>
          Doow Inc. is a financial technology company duly incorporated under
          the laws of Delaware, United States of America. Doow is not a bank.
          Doow offers all of its services in partnership with licensed banking
          and financial partners in their respective jurisdictions worldwide.
          All logos, trademarks and brand names belong to their respective
          owners. Using these brand items does not imply endorsement with Doow.
        </div>
      </div>
    </div>
  );
}
