import React from "react";
// import { CardContainer } from "./halfCard/cardContainer";
// import { HalfCard } from "./halfCard/halfCard";
import { Styler } from "./cardContainer/styler";
import FooterHome from "./footer/footer.comp";
import { FullCard } from "./fullCard/fullCard";
import { Jumbutron } from "./jumbotron/jumbutron";
import { HomeLanding } from "./Landing/Landing";
import LandingNavBar from "./navbar/navbar.comp";
import styles from "./home.module.scss";
import { HomeFaq } from "./faq/faq";
import { CardBanner } from "./cardBanner/CardBanner";
import { JumbutronMid } from "./jumbotronMid/jumbutronMid";
import { Integrations } from "./integrations/integrations";

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
      <JumbutronMid
        title={`Open multi-currency business accounts without 
        visiting any bank, accept payments in USD, NGN, EUR, GBP, and 
        KES via local payment methods, create unlimited Master and
         VISA cards for your company, SAAS subscriptions, \
        and employees, manage all your budgets, expenses and permissions in one place!`}
        bgColor={Styler.background1}
      />
      <FullCard
        title="Own local and international business accounts in your company name"
        subtitle={`
Open business 
accounts in the US, UK, Europe, Kenya, and Nigeria, 
without all the unnecessary paperwork and 
having to visit the bank.
        `}
        subtitle2={`
            Create as many sub-accounts, currency wallets, savings pots, 
and budgets as you need in 40+ currencies, and assign the right 
management and spending permissions to your team
          `}
        imgUrl={"./images/half.png"}
        buttonTitle={"Join the waitlist"}
        bgColor="#04aa94"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />

      <FullCard
        title="Accept card payments and other international payment methods."
        subtitle={`
          Set up, schedule, or instantly share digital invoices 
          and payment links, so you can accept both one-time and 
          recurring payments from your customers and settle in any currency you chose.
        `}
        subtitle2={`
         Doow supports credit and debit cards, PayPal, Apple Pay, Google Pay, 
         and other global and local payment 
         methods available in the US, UK, Europe, Kenya, and Nigeria.
        `}
        imgUrl={"./images/paym.png"}
        buttonTitle={"Join the waitlist"}
        bgColor="#E18738"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />

      <CardBanner />
      <FullCard
        title="Access market leading interbank exchange rates across the world in real-time"
        subtitle={`
        Avoid high exchange rates and transfer fees when you convert on Doow. 
        Our FX partners offer real-time market-leading rates every day, even on weekends,
        so your business can always exchange and spend whenever you want.`}
        subtitle2={`
          You can hold funds in more than 40 currencies and exchange whenever you 
          decide is right for your business. In seconds, 
          you can move money from your foreign balances into 
          your local currency account and withdraw via your 
          preferred local payment method.
        `}
        imgUrl={"./images/fx7.png"}
        buttonTitle={"Join the waitlist"}
        bgColor="#099CCD"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />
      <FullCard
        title="Expense Mgt & Permissions"
        subtitle={`You can easily create spend policies and limits for 
        budget categories, reimbursements, company cards, 
        and global accounts to align with your company’s 
        financial goals at anytime. Add as many team members to 
        your finance workspace and manage their real-time spend 
        and access levels from one dashboard.
      `}
        subtitle2={`
          From expense management to Doow company 
          and employee cards, business bank accounts, 
          sub-accounts, budgets, and even our multi-currency 
          wallets, you can assign roles and different 
          levels of permission to your team.

        `}
        imgUrl={"./images/exp1.png"}
        buttonTitle={"Join the waitlist"}
        bgColor="#589479"
        // bgColor="#2d6a4f"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />

      <Jumbutron
        title={`
          We're not a bank. We’re Doow, different and even better for your finances!
        `}
        subtitle={"Let’s doow this!"}
        bgColor={Styler.white}
      />

      <FullCard
        title="Reporting"
        subtitle={`
          Set up, schedule, or instantly share digital invoices 
          and payment links, so you can accept both one-time and 
          recurring payments from your customers and settle in any currency you chose.
        `}
        subtitle2={`
         Doow supports credit and debit cards, PayPal, Apple Pay, Google Pay, 
         and other global and local payment 
         methods available in the US, UK, Europe, Kenya, and Nigeria.
        `}
        imgUrl={"./images/report.png"}
        buttonTitle={"Join the waitlist"}
        bgColor="#8338ec"
        textColor={Styler.white}
        btnHref={"waitlist"}
        containerBgColor={Styler.white}
      />
      <Integrations />
      <HomeFaq />
      <FooterHome />
    </div>
  );
}
