import type { NextPage } from "next";
import Head from "next/head";
import LandingNavBar from "../home/navbar/navbar.comp";
import styles from "./login.module.scss";
import Input from "../../components/inputs/input";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/buttons/custom-button";
import { logMemberIn, useAuthDispatch, useAuthState } from "../../context/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "../../components/loading/loading";
import { HomeLandingR } from "../Landing/Landing";
import SignIn from "./signIn";
import Link from "next/link";
import SignUp from "./signUp";
import { useState } from "react";

export interface IProps {
  onChange: () => void;
}

export const LoginView: NextPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const dispatch = useAuthDispatch();
  const router = useRouter();

  return (
    <div>
      <div className={styles.login}>
        {/* {loading && <Loading />} */}

        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <Link href="/">
              <img src="/images/Doow.png" className={styles.imgd} />
            </Link>
            <h1>Cross-border banking</h1>
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
