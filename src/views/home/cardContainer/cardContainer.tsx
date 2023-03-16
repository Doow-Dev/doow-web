import { useRouter } from "next/router";
import styles from "./halfCard.module.scss";
import { Styler } from "./styler";

interface CardContainer {
  bgColor: string;
  card1: JSX.Element;
  card2: JSX.Element;
  // card2: Array<JSX.Element>;
  // children?: React.ReactNode;
}
export const CardContainer = (props: CardContainer) => {
  return (
    <div style={{ ...Styler.diver, backgroundColor: props.bgColor }}>
      {props.card1}
      {props.card2}
    </div>
  );
};
