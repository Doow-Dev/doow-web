import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputButton, InputPassowrd, InputText } from "../../comps/forms";
import styles from "./login.module.scss";
import { IProps } from "./login.view";
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from "../../components/loading/loading";

const initialValues = {
  password: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("password is required")
    .min(6, "must be at least 6 characters long"),
  email: Yup.string()
    .required("email is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email"
    ),
});

export default function SignIn(props: IProps) {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showLoader, setshowLoader] = useState(false);

  return (
    <div className={styles.contentForm}>
      {showLoader && <Loading />}
      <div className={styles.topText}>
        <h2>Welcome</h2>
        {/* <BiHome onClick={() => router.push("/")} /> */}
        <img
          src="/images/onwhite.png"
          className={styles.imgd}
          onClick={() => router.push("/")}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const handleLogin = () => {
            // router.push("/account/dashboard");
            setshowLoader(true);
            setTimeout(() => {
              setshowLoader(false);
              router.push("/waitlist");
            }, 2000);
          };
          handleLogin();
        }}
      >
        {({ values, errors, handleChange, handleSubmit, touched }) => (
          <form onSubmit={(e) => e.preventDefault()}>
            <InputText
              //   type="email"
              label="Business email"
              value={values.email}
              placeholder="name@workemail.com"
              name={""}
              id={"email"}
              onChange={handleChange("email")}
              error={touched.email && errors.email ? errors.email : undefined}
            />
            <InputPassowrd
              value={values.password}
              label="Password"
              placeholder="password"
              name={"password"}
              id={"password"}
              onChange={handleChange("password")}
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />
            <InputButton name={"Login"} onClick={() => handleSubmit()} />
            <p onClick={() => router.push("/waitlist")}>Get early access?</p>
            {/* <p onClick={() => props.onChange()}>Create an account</p> */}
          </form>
        )}
      </Formik>
    </div>
  );
}
