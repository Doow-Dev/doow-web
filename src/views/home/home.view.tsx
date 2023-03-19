import React from "react";
import { CardContainer } from "./cardContainer/cardContainer";
import { Styler } from "./cardContainer/styler";
import FooterHome from "./footer/footer.comp";
import { FullCard } from "./fullCard/fullCard";
import { HalfCard } from "./halfCard/halfCard";
import { Jumbutron } from "./jumbotron/jumbutron";
import { HomeLanding } from "./Landing/Landing";
import LandingNavBar from "./navbar/navbar.comp";
import styles from "./home.module.scss";

export default function HomeView() {
  return (
    <div>
      <LandingNavBar />
      <HomeLanding />
      <Jumbutron
        title={"Spend, save and enjoy."}
        subtitle={"Na who chop dey see tomorrow."}
        bgColor={Styler.background1}
      />

      <div className={styles.imageContainer}>
        <img src="./images/private.png" className={styles.img} />
      </div>
      <FullCard
        title="Firsty, spend and save faster."
        subtitle={"A lil Story. A lil Story. A lil Story"}
        imgUrl={"./images/reports.png"}
        buttonTitle={"Get Started"}
        bgColor={"rgb(7, 138, 164)"}
        textColor={Styler.white}
      />

      <FullCard
        title="Send, spend and save faster."
        subtitle={"A lil Story. A lil Story. A lil Story"}
        imgUrl={"./images/invoice.png"}
        buttonTitle={"Get Started"}
        bgColor={"rgb(7, 141, 99)"}
        textColor={Styler.white}
      />
      <Jumbutron
        title={"Spend, save and enjoy."}
        subtitle={"Na who chop dey see tomorrow."}
        bgColor={Styler.white}
      />
      <CardContainer
        bgColor={Styler.white}
        card1={
          <HalfCard
            title="Half Card"
            subtitle={"A lil Story. A lil Story. A lil Story"}
            imgUrl={"./images/currency.png"}
            buttonTitle={"Get Started"}
            bgColor={"rgb(208, 5, 215)"}
            textColor={Styler.white}
          />
        }
        card2={
          <HalfCard
            title="Half Card"
            subtitle={"A lil Story. A lil Story. A lil Story"}
            imgUrl={"./images/expenses.png"}
            buttonTitle={"Get Started"}
            bgColor={"rgb(5, 116, 81)"}
            textColor={Styler.white}
          />
        }
      />
      <FooterHome />
    </div>
  );
}
