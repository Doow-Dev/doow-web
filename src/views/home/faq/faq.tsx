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
  // useEf;
  return (
    <div id="home" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <h1>Frequently asked questions</h1>
        </div>

        <div className={styles.itemSection}>
          <FaqItem
            title={"When is Doow launching?"}
            content={
              <div>
                <p>
                  Doow is launching soon. We’re currently in the middle of
                  partnerships and integrations with licensed and insured banks,
                  corporate card issuers and fintech partners around the world
                  to offer you a comprehensive suite of financial products when
                  we go live.
                </p>
              </div>
            }
          />
          <FaqItem
            title={"Can I open foreign business accounts from anywhere?"}
            content={
              <div>
                <p>
                  Yes, Doow supports companies from over 190 countries. We don’t
                  require an SSN or ITIN to open your business bank account in
                  the United States.
                </p>
              </div>
            }
          />
          <FaqItem
            title={"Is Doow a Bank?"}
            content={
              <div>
                <p>
                  Doow is not a bank. Doow is financial technology company that
                  offers all of its services in partnership with licensed
                  banking and financial partners in their respective
                  jurisdictions worldwide.
                </p>
              </div>
            }
          />
          <FaqItem
            title={"Is Doow free?"}
            content={
              <div>
                <p>
                  Yes and no, technically. Doow will be free of subscription
                  fees for customers who join our waitlist and use the product
                  during our beta period. We'll launch tiered subscription plans
                  once we launch out of beta.
                </p>
              </div>
            }
          />
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
