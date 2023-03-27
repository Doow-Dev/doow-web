import { useRouter } from "next/router";
import styles from "./integrations.module.scss";

interface IJumbutron {
  title?: string;
  subtitle?: string;
  bgColor?: string;
}
export const Integrations = (props: IJumbutron) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: props.bgColor }}
    >
      <div className={styles.content}>
        <img src="./assets/integrations/1.png" className={styles.imgd} />
        <img src="./assets/integrations/2.png" className={styles.imgd} />
        <img src="./assets/integrations/3.png" className={styles.imgd} />
        <img src="./assets/integrations/4.png" className={styles.imgd} />
        <img src="./assets/integrations/5.png" className={styles.imgd} />
        <img src="./assets/integrations/6.png" className={styles.imgd} />
        <img src="./assets/integrations/7.png" className={styles.imgd} />
        <img src="./assets/integrations/8.png" className={styles.imgd} />
        <img src="./assets/integrations/9.png" className={styles.imgd} />
        <img src="./assets/integrations/10.png" className={styles.imgd} />
        <img src="./assets/integrations/11.png" className={styles.imgd} />
        <img src="./assets/integrations/12.png" className={styles.imgd} />
        {/* Set 2 */}
        <img src="./assets/integrations/1.png" className={styles.imgd} />
        <img src="./assets/integrations/2.png" className={styles.imgd} />
        <img src="./assets/integrations/3.png" className={styles.imgd} />
        <img src="./assets/integrations/4.png" className={styles.imgd} />
        <img src="./assets/integrations/5.png" className={styles.imgd} />
        <img src="./assets/integrations/6.png" className={styles.imgd} />
        <img src="./assets/integrations/7.png" className={styles.imgd} />
        <img src="./assets/integrations/8.png" className={styles.imgd} />
        <img src="./assets/integrations/9.png" className={styles.imgd} />
        <img src="./assets/integrations/10.png" className={styles.imgd} />
        <img src="./assets/integrations/11.png" className={styles.imgd} />
        <img src="./assets/integrations/12.png" className={styles.imgd} />
      </div>
    </div>
  );
};
