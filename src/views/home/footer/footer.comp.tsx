import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import Image from "next/image";

export default function FooterHome() {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [user, setUser] = useState(null);
  const show = "show";
  const [showNav, setShowNav] = useState(false);
  // console.log("Path -", _path);
  return (
    <>
      <div className={styles.container}>
        <label className={styles.brand}>
          <Link href="/" className={styles.brand}>
            DOOW
          </Link>
        </label>
      </div>
    </>
  );
}
