import React from "react";
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
          at anytime`}
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
        title="Own foreign business accounts in your company name"
        subtitle={`
Open local and international business accounts in the US, UK, 
Europe, Kenya, and Nigeria without having to visit a bank in these countries.
        `}
        subtitle2={`
    Create unlimited sub-accounts, currency wallets, savings pods, and
     budgets in 40+ currencies, and assign the right permissions to your team.
          `}
        imgUrl={"./images/half.png"}
        buttonTitle={"Get early access"}
        bgColor="#04aa94"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />

      <FullCard
        title="Accept card payments and other international methods"
        subtitle={`
         Share digital invoices and payment links with anyone, 
         anywhere. You can accept one-time and recurring 
         payments from your customers and settle in 
         any currency balance you choose.
        `}
        subtitle2={`
         Doow supports credit and debit cards, PayPal, Apple Pay, 
         Google Pay, and other global and 
         local payment methods available in the 
         US, UK, Europe, Kenya, and Nigeria.
        `}
        imgUrl={"./images/paym.png"}
        buttonTitle={"Get early access"}
        bgColor="#E18738"
        textColor={Styler.white}
        btnHref={"waitlist"}
        containerBgColor={Styler.background1}
      />

      <CardBanner />
      <FullCard
        title="Access interbank exchange rates across the world in real-time"
        subtitle={`
        Hold funds in 40+ currencies and exchange whenever is right for your business. 
        In seconds, you can move money from your foreign balances into your 
        local currency account and withdraw via your preferred local payment method.
        `}
        subtitle2={`
          Our FX partners offer market-leading rates every day, 
          even on weekends, so your business can always exchange 
          and spend whenever you want.
        `}
        imgUrl={"./images/fx7.png"}
        buttonTitle={"Get early access"}
        bgColor="#099CCD"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />
      <FullCard
        title="One place for all your global budgets, expenses and approvals"
        subtitle={`
        Create spend policies and limits that align budget categories, 
        reimbursements, company cards, and global accounts 
        with your financial goals. You can add as many team members 
        and manage real-time spend and access, all from one dashboard.
      `}
        subtitle2={`
          Doow matches receipts from all your digital transactions 
          to the right expense category so you can avoid unnecessary 
          paperwork. In few clicks, your employees can scan and upload receipts 
          and we’ll automatically match it to the right expense category for review and approval.
        `}
        imgUrl={"./images/exp1.png"}
        buttonTitle={"Get early access"}
        bgColor="#589479"
        textColor={Styler.white}
        btnHref={"waitlist"}
      />

      <Jumbutron
        title={`
          We're not a bank. We’re Doow, 
          different and even better for your finances!
        `}
        subtitle={""}
        bgColor={Styler.white}
      />

      <FullCard
        title={`
            Automated reporting dashboards to monitor how your money moves in and out
          `}
        subtitle={`
          You can track real-time financial data from card transactions, bank 
          accounts and other payment channels in just a few clicks.
        `}
        subtitle2={`
        From one dashboard, you can monitor your 
        team's real-time spend, create custom 
        rules, and approve requests in a few clicks or at a later date.
        `}
        imgUrl={"./images/report.png"}
        buttonTitle={"Get early access"}
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
