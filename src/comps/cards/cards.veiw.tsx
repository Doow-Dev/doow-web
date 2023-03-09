import Link from "next/link";
import React from "react";
import styles from "./cards.module.scss";

interface Props {
  sectionTitle: string;
  isClickable: boolean;
  objs: {
    href?: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
  }[];
}
export default function CardsSection(props: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{props.sectionTitle}</p>

      <div className={styles.cards}>
        {props.isClickable
          ? props.objs.map((obj, index) => (
              <Link href={obj.href} key={index}>
                <div onClick={obj.onClick}>
                  <h3>{obj.title}</h3>
                  <p>{obj.subtitle}</p>
                </div>
              </Link>
            ))
          : props.objs.map((obj, index) => (
              <div key={index} onClick={obj.onClick}>
                <h3>{obj.title}</h3>
                <p>{obj.subtitle}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
