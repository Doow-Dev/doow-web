import type { NextPage } from "next";
import Head from "next/head";
import LandingNavBar from "../Landing/navbar/navbar.comp";
import styles from "./login.module.scss";
import Input from "../../components/inputs/input";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/buttons/custom-button";
import Link from "next/link";
import { logMemberIn, useAuthDispatch, useAuthState } from "../../context/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loading from "../../components/loading/loading";

const initialValues = {
  phone: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("phone number is required")
    .matches(
      /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/,
      "please enter a valid phone number"
    ),
  password: Yup.string().required("password is required"),
});

export const LoginView: NextPage = () => {
  const { loading, errorMessage } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>login</title>
        <meta name="description" content="The login page of DOOW members" />
        <link rel="icon" href="/assets/images/apc-logo.png" />
      </Head>
      <div className={styles.login}>
        {loading && <Loading />}
        <LandingNavBar />
        <div className={styles.container}>
          <h2>Welcome Back</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                // add login implementation
                try {
                  const response = await logMemberIn(dispatch, {
                    phone: "0" + values.phone,
                    password: values.password,
                  });
                  toast.success(`log in successful`);

                  router.push("/profile");
                } catch (error) {
                  toast.error(`log in failed, try again`);
                } finally {
                }
              }}
            >
              {({ values, errors, handleChange, handleSubmit, touched }) => (
                <>
                  <Input
                    type="number"
                    label="Phone"
                    value={values.phone}
                    placeholder="Enter your phone number"
                    handleChange={handleChange("phone")}
                    error={touched.phone && errors.phone}
                  />
                  <Input
                    type="password"
                    label="Password"
                    value={values.password}
                    placeholder="Enter your password"
                    handleChange={handleChange("password")}
                    error={touched.password && errors.password}
                  />

                  <div className={styles.take_action}>
                    <p>Forgot your password? </p>
                    <span>
                      <Link href="#">Reset it here</Link>
                    </span>
                  </div>

                  <CustomButton
                    title="Log in"
                    onClickHandler={handleSubmit}
                    type={"submit"}
                  />

                  <div className={styles.take_action}>
                    <p>Not yet on the platform? </p>
                    <span>
                      <Link href="register">Register</Link>
                    </span>
                  </div>
                </>
              )}
            </Formik>
          </form>
        </div>
      </div>
    </div>
  );
};
