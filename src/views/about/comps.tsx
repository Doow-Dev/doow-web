import React from "react";
import styles from "./about.module.scss";

export function AboutTitle(props) {
  return <div className={styles.title}>{props.children}</div>;
}

export function AboutBody(props) {
  return <div className={styles.body}>{props.children}</div>;
}

export function AboutSection(props) {
  return <div className={styles.section}>{props.children}</div>;
}

export function AboutSubtitle(props) {
  return <div className={styles.subtitle}>{props.children}</div>;
}
