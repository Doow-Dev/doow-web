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
import { HomeFaq } from "./faq/faq";
import { CardBanner } from "./cardBanner/CardBanner";

export default function HomeView() {
  return (
    <div>
      <LandingNavBar />
      <HomeLanding />
      <Jumbutron
        title={"Do business in 190+ countries from one place"}
        subtitle={`
        Whether you're a one-man business, a startup or a large coorporation,
          Doow is the place to manage all your local and international finances
          at anytime.`}
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
        bgColor="#00bbf9"
        textColor={Styler.white}
      />

      <FullCard
        title="Send, spend and save faster."
        subtitle={"A lil Story. A lil Story. A lil Story"}
        imgUrl={"./images/invoice.png"}
        buttonTitle={"Get Started"}
        bgColor="#06BEA6"
        textColor={Styler.white}
      />
      <Jumbutron
        title={"Spend, save and enjoy."}
        subtitle={"Na who chop dey see tomorrow."}
        bgColor={Styler.white}
      />
      <CardBanner />
      {/* <CardContainer
        bgColor={Styler.white}
        card1={
          <HalfCard
            title="Multi-Currency Business Accounts"
            subtitle={`
              You can open local and international business 
              accounts in the US, UK, Europe, Kenya, and Nigeria, without all 
              the unnecessary paperwork, 
              and having to visit a bank branch in any of these countries.
            `}
            imgUrl={"./images/currency.png"}
            buttonTitle={"Get Started"}
            bgColor="#9b5de5"
            textColor={Styler.white}
          />
        }
        card2={
          <HalfCard
            title={`Expense Mgt & Permissions`}
            subtitle={`You can easily create spend 
            policies and limits for budget categories, reimbursements, 
            company cards, and global accounts to align with your company’s 
            financial goals at anytime. Add as many team members to your 
            finance workspace and manage their real-time
            spend and access levels from one dashboard.`}
            imgUrl={"./images/expenses.png"}
            buttonTitle={"Get Started"}
            bgColor="#f15bb5"
            textColor={Styler.white}
          />
        }
      /> */}
      <HomeFaq />
      <FooterHome />
    </div>
  );
}
