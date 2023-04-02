import React from "react";
import styles from "./styles.module.scss";

export function AboutTitle(props) {
  return <div className={styles.title}>{props.children}</div>;
}
export function AboutSubHeading(props) {
  return <div className={styles.subheading}>{props.children}</div>;
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

interface IProps {
  title: string;
  subtitle: string;
}
export function TopSection(props: IProps) {
  return (
    <div className={styles.TopSection}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>{props.title}</h1>
        </div>

        <div className={styles.bottomDiv}>
          <p className={styles.smallText}>{props.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
