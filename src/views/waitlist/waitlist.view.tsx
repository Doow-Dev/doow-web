import type { NextPage } from "next";
import Head from "next/head";
import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./waitlist.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";
import Loading from "../../components/loading/loading";
import loading from "../../components/loading/loading";
import { InputText } from "../../comps/forms";

export const WaitList: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className={styles.login}>
        {loading && <Loading />}
        <LandingNavBar />
        <div className={styles.container}>
          <h2>Welcome Back</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              label={"Name"}
              name={"Name"}
              id={"name"}
              onChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />

            <div className={styles.take_action}>
              <p>Not yet on the platform? </p>
              <span>
                <Link href="register">Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
