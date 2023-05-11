import { useRouter } from "next/router";
import React from "react";
import { GlobalLinks } from "../../../helper/links";
import styles from "./navbar.module.scss";

export default function NavFooter() {
  const router = useRouter();
  return (
    <div className={styles.buttons}>
      <div
        className="btn"
        onClick={() => router.push(GlobalLinks.home.waitlist)}
      >
        Get early access
      </div>
    </div>
  );
}
