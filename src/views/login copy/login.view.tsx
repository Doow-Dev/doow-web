import type { NextPage } from "next";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import SignIn from "./signIn";
import SignUp from "./signUp";
import { useState } from "react";
import LandingNavBar from "../home/navbar/navbar.comp";

export interface IProps {
  onChange: () => void;
}

export const LoginView: NextPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div className={styles.login}>
        {/* {loading && <Loading />} */}
        {/* <LandingNavBar /> */}
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            {/* <Link href="/">
              <img src="/images/Doow.png" className={styles.imgd} />
            </Link> */}
            <h1>Africa's #1 business bank</h1>
            <p className={styles.smallText}>Welcome</p>
          </div>
          {showSignUp ? (
            <SignUp onChange={() => setShowSignUp(false)} />
          ) : (
            <SignIn onChange={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  );
};
