import { useRouter } from "next/router";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import styles from "./JoinWaitlist.module.scss";

interface IBtn {
  title: string;
  href: string;
}
export default function JoinWaitlist(props: IBtn) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.btn} onClick={() => router.push(props.href)}>
        {props.title}
      </p>
      <p className={styles.btnArrow}>
        <BsArrowRight />
      </p>
    </div>
  );
}
