import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHome } from "react-icons/bi";
import { InputButton, InputPassowrd, InputText } from "../../comps/forms";
import styles from "./login.module.scss";
import { IProps } from "./login.view";

export default function SignIn(props: IProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  return (
    <div className={styles.contentForm}>
      <div className={styles.topText}>
        <h2>Welcome</h2>
        <BiHome onClick={() => router.push("/")} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputText
          //   type="email"
          label="Business email"
          value={credentials.email}
          placeholder="name@workemail.com"
          name={""}
          id={"email"}
          onChange={(e) => {
            setCredentials({
              ...credentials,
              email: e.target.value,
            });
          }}
        />
        <InputPassowrd
          value={credentials.password}
          label="Password"
          placeholder="password"
          name={"password"}
          id={"password"}
          onChange={(e) => {
            setCredentials({
              ...credentials,
              password: e.target.value,
            });
          }}
        />
        <InputButton name={"Login"} onClick={() => router.push("/dashboard")} />
        <p onClick={() => router.push("/waitlist")}>Get early access?</p>
        {/* <p onClick={() => props.onChange()}>Create an account</p> */}
      </form>
    </div>
  );
}
