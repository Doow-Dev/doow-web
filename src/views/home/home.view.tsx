import React from "react";
import { CardContainer } from "./cardContainer/cardContainer";
import { Styler } from "./cardContainer/styler";
import FooterHome from "./footer/footer.comp";
import { FullCard } from "./fullCard/fullCard";
import { HalfCard } from "./halfCard/halfCard";
import { Jumbutron } from "./jumbotron/jumbutron";
import { HomeLanding } from "./Landing/Landing";
import LandingNavBar from "./navbar/navbar.comp";

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
      <FullCard
        title="Firsty, spend and save faster."
        subtitle={"A lil Story. A lil Story. A lil Story"}
        imgUrl={"./images/logo.png"}
        buttonTitle={"Get Started"}
        bgColor={"rgb(7, 164, 96)"}
        textColor={Styler.white}
      />

      <FullCard
        title="Send, spend and save faster."
        subtitle={"A lil Story. A lil Story. A lil Story"}
        imgUrl={"./images/logo.png"}
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
            imgUrl={"./images/logo.png"}
            buttonTitle={"Get Started"}
            bgColor={"rgb(208, 5, 215)"}
            textColor={Styler.white}
          />
        }
        card2={
          <HalfCard
            title="Half Card"
            subtitle={"A lil Story. A lil Story. A lil Story"}
            imgUrl={"./images/logo.png"}
            buttonTitle={"Get Started"}
            bgColor={"rgb(223, 33, 96)"}
            textColor={Styler.white}
          />
        }
      />
      <FooterHome />
    </div>
  );
}
