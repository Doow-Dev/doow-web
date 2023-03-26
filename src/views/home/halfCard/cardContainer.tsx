import styles from "./halfCard.module.scss";
import { Styler } from "../cardContainer/styler";

interface CardContainer {
  bgColor: string;
  card1: JSX.Element;
  card2: JSX.Element;
  // card2: Array<JSX.Element>;
  // children?: React.ReactNode;
}
export const CardContainer = (props: CardContainer) => {
  return (
    <div className={styles.diver} style={{ backgroundColor: props.bgColor }}>
      {props.card1}
      {props.card2}
    </div>
  );
};
