import { useRouter } from "next/router";
import React from "react";
import styles from "./navbar.module.scss";

export default function NavFooter() {
  const router = useRouter();
  return (
    <div className={styles.buttons}>
      <div className="btn" onClick={() => router.push("/waitlist")}>
        Get early access
      </div>
    </div>
  );
}
