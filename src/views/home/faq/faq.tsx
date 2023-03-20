import { useState } from "react";
import {
  BiArrowFromTop,
  BiChevronDown,
  BiChevronUp,
  BiDownArrow,
} from "react-icons/bi";
import { BsArrow90DegDown } from "react-icons/bs";
import styles from "./faq.module.scss";

export const HomeFaq = () => {
  return (
    <div id="home" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>Frequently Asked Questions</h1>
        </div>

        <div className={styles.itemSection}>
          <FaqItem
            title={"What type of card can I get?"}
            content={
              <div>
                <p>
                  Developers love our thorough, well-documented APIs that let
                  you to build everything from simple weekend projects, to
                  complex financial products serving hundreds of thousands of
                  customers. If you can imagine it, you can build it with
                  Paystack.
                </p>
                <p>
                  Developers love our thorough, well-documented APIs that let
                  you to build everything from simple weekend projects, to
                  complex financial products serving hundreds of thousands of
                  customers. If you can imagine it, you can build it with
                  Paystack.
                </p>
              </div>
            }
          />
          <FaqItem title={"A title"} />
          <FaqItem title={"A title"} />
          <FaqItem title={"A title"} />
        </div>
      </div>
    </div>
  );
};

interface IFaqItem {
  title: string;
  content?: JSX.Element;
}
export function FaqItem(props: IFaqItem) {
  const [showBody, setshowBody] = useState(false);
  return (
    <div className={styles.FaqItem}>
      <div
        className={styles.ItemTitle}
        style={{ marginBottom: "0px" }}
        // onMouseOver={() => setshowBody(!showBody)}
        onClick={() => setshowBody(!showBody)}
      >
        <h3>{props.title}</h3>
        {showBody ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
      </div>
      {showBody && <div className={styles.ItemBody}>{props.content}</div>}
    </div>
  );
}
