import React from "react";
import { InputButton, InputText } from "../../comps/forms";
import styles from "./login.module.scss";
import { IProps } from "./login.view";

export default function SignIn(props: IProps) {
  function handleChange(v: string) {}
  function handleSubmit() {}
  return (
    <div className={styles.contentForm}>
      <h2>Welcome</h2>
      <form onSubmit={(e) => e.preventDefault()}>
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
        <InputButton name={"Login"} onClick={function (): void {}} />
        <p onClick={() => props.onChange()}>Create an account</p>
      </form>
    </div>
  );
}
