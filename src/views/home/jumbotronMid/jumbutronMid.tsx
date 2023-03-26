import { useRouter } from "next/router";
import styles from "./jumbutron.module.scss";

interface IJumbutron {
  title: string;
  subtitle?: string;
  bgColor: string;
}
export const JumbutronMid = (props: IJumbutron) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: props.bgColor }}
    >
      <div className={styles.content}>
        <div className={styles.sectionTitle}>{props.title}</div>
      </div>
    </div>
  );
};
