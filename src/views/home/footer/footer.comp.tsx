import React, { useState } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";

export default function FooterHome() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.linkList}>
          <h4 className={styles.brand}> doow</h4>
          <ul>
            <li>Products</li>
            <li>Business Cards</li>
            <li>Global Cards</li>
            <li>Payments</li>
            <li>Fx</li>
            <li>Spend management</li>
          </ul>
          <ul>
            <li>Company</li>
            <li>
              <Link href={"/about_us"}>About Us</Link>
            </li>
            <li>
              <Link href={"/contact_us"}>Contact Us</Link>
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
