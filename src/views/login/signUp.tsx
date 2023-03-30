import React from "react";
import { InputButton, InputText } from "../../comps/forms";
import styles from "./login.module.scss";
import { IProps } from "./login.view";

export default function SignUp(props: IProps) {
  function handleChange(v: string) {}
  function handleSubmit() {}
  return (
    <div className={styles.contentForm}>
      <h2>Create new account</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputText
          //   type="email"
          label="First name"
          value={""}
          placeholder="email"
          name={""}
          id={"email"}
          onChange={() => handleChange("email")}
        />
        <InputText
          //   type="email"
          label="Last name"
          value={""}
          placeholder="email"
          name={""}
          id={"email"}
          onChange={() => handleChange("email")}
        />
        <InputText
          //   type="email"
          label="Business email"
          value={""}
          placeholder="email"
          name={""}
          id={"email"}
          onChange={() => handleChange("email")}
        />
        <InputText
          value={""}
          label="Password"
          placeholder="password"
          onChange={() => handleChange("password")}
          name={"password"}
          id={"password"}
        />
        <InputButton
          name={"Create an account"}
          onClick={function (): void {}}
        />
        <p onClick={() => props.onChange()}>Already have an account?</p>
      </form>
    </div>
  );
}
