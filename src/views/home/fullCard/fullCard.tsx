import { useRouter } from "next/router";
import { BiArrowToRight } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import JoinWaitlist from "../JoinBtn/JoinWaitlist";
import styles from "./fullCard.module.scss";

interface IFullCard {
  title: string;
  subtitle: string;
  subtitle2?: string;
  subtitle3?: string;
  imgUrl: string;
  buttonTitle: string;
  bgColor: string;
  containerBgColor?: string;
  textColor: string;
  btnHref: string;
}

export const FullCard = (props: IFullCard) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: props.containerBgColor }}
    >
      <div
        className={styles.content}
        style={{ backgroundColor: props.bgColor }}
      >
        <div className={styles.textSection}>
          <div className={styles.textContent}>
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
            {props.subtitle3 && (
              <p
                className={styles.subtitle2}
                style={{ color: props.textColor }}
              >
                {props.subtitle3}
              </p>
            )}
          </div>
          <JoinWaitlist title={props.buttonTitle} href={props.btnHref} />
        </div>

        <div className={styles.imager}>
          <img src={props.imgUrl} className={styles.imgd} />
        </div>
      </div>
    </div>
  );
};
