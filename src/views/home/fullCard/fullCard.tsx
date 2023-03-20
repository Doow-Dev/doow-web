import { useRouter } from "next/router";
import styles from "./fullCard.module.scss";

interface IFullCard {
  title: string;
  subtitle: string;
  imgUrl: string;
  buttonTitle: string;
  bgColor: string;
  textColor: string;
}

export const FullCard = (props: IFullCard) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        style={{ backgroundColor: props.bgColor }}
      >
        <div className={styles.textSection}>
          <div>
            <h3
              className={styles.sectionTitle}
              style={{ color: props.textColor }}
            >
              {props.title}
            </h3>
            <p className={styles.subtitle} style={{ color: props.textColor }}>
              {props.subtitle}
            </p>
          </div>

          <input
            className={styles.btn}
            value={props.buttonTitle}
            type="button"
          />
        </div>

        <div className={styles.imager}>
          <img src={props.imgUrl} className={styles.imgd} />
        </div>
      </div>
    </div>
  );
};
