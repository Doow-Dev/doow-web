import React, { useState } from "react";
import Link from "next/link";
import styles from "./footer.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { GlobalLinks } from "../../../helper/links";

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
            <li className={styles.listItems}>Foreign Business Accounts</li>
            <li className={styles.listItems}>Corporate Cards</li>
            <li className={styles.listItems}>Global Payments</li>
            <li className={styles.listItems}>Fx & Conversions</li>
            <li className={styles.listItems}>Multi-currency Reimbursements</li>
            <li className={styles.listItems}>Spend Management</li>
            <li className={styles.listItems}>Connections</li>
          </ul>
          <ul>
            <li className={styles.listheader}>Company</li>
            <li
              className={styles.listItems}
              onClick={() => router.push(GlobalLinks.home.about_us)}
            >
              About Us
            </li>
            <li
              className={styles.listItems}
              onClick={() => router.push(GlobalLinks.home.contact_us)}
            >
              Contact Us
            </li>
            <li
              className={styles.listItems}
              onClick={() => router.push(GlobalLinks.home.privacy)}
            >
              Privacy Policy
            </li>
            <li
              className={styles.listItems}
              onClick={() => router.push(GlobalLinks.home.terms)}
            >
              Terms of Use
            </li>
          </ul>
          <div className={styles.address}>
            <p className={styles.addressheader}>Location</p>
            <p>1007 N Orange St. 4th Floor,</p>
            <p>Wilmington, DE,</p>
            <p>United States</p>
            {/* <p>support@doow.co</p> */}
          </div>
        </div>
        <div className={styles.copywright}>
          <p>© 2023 Doow Inc. All rights reserved</p>
        </div>
        <div className={styles.shortText}>
          Doow Inc. is a financial technology company duly incorporated under
          the laws of Delaware, United States of America. Doow is not a bank.
          Doow offers all of its services in partnership with licensed banking
          and financial partners in their respective jurisdictions worldwide.
        </div>
        <div className={styles.shortText}>
          All logos, trademarks and brand names belong to their respective
          owners. Using these brand items does not imply endorsement with Doow.
        </div>
      </div>
    </div>
  );
}
