import { useRouter } from "next/router";
import { BiArrowToRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import styles from "./fullCard.module.scss";

interface IFullCard {
  title: string;
  subtitle: string;
  subtitle2?: string;
  subtitle3?: string;
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
            <p className={styles.subtitle2} style={{ color: props.textColor }}>
              {props.subtitle2}
            </p>
          </div>

          <div className={styles.btnSection}>
            <p className={styles.btn}>{props.buttonTitle}</p>
            <p className={styles.btnArrow}>
              <BsArrowRight />
            </p>
          </div>
        </div>

        <div className={styles.imager}>
          <img src={props.imgUrl} className={styles.imgd} />
        </div>
      </div>
    </div>
  );
};
