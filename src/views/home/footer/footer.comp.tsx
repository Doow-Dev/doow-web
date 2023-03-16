import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import Image from "next/image";

export default function FooterHome() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h4 className={styles.brand}> DOOW</h4>
        <div className={styles.linkList}>
          <ul>
            <li>Links</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <ul>
            <li>Navigation</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <ul>
            <li>Products</li>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={styles.shortText}>
          We are the choosen generation, called to show forth his excellency.
        </div>
        <div className={styles.copywright}>
          <p>© copyright All rights reserved</p>
          <p>Powered by Hexelan</p>
        </div>
      </div>
    </div>
  );
}
