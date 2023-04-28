import React from "react";
import styles from "./styles.module.scss";
import { error } from "console";

interface Props {
  label: string;
  sublabel?: string;
  name: string;
  value?: string;
  id: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IComponrnts {
  InputText: JSX.Element;
}

export function InputText(props: Props): JSX.Element {
  const { id, label, name, value, placeholder, onChange, sublabel, error } =
    props;
  return (
    <div className={styles.input_box_text}>
      <label htmlFor={name} className="label">
        {label}
        <span>{sublabel}</span>
      </label>
      <input
        // title="inputtext"
        type="text"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
}

export function InputPassowrd(props: Props): JSX.Element {
  const { id, label, name, value, placeholder, onChange, error, sublabel } =
    props;
  return (
    <div className={styles.input_box_text}>
      <label htmlFor={name} className="label">
        {label}
        <span>{sublabel}</span>
      </label>
      <input
        // title="inputtext"
        type="password"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
}

export function InputNumber(props: Props): JSX.Element {
  const { id, label, name, value, placeholder, onChange } = props;
  return (
    <div className={styles.input_box_number}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type="number"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function Seperator() {
  return <hr className={styles.hr} />;
}

interface IButton {
  name: string;
  onClick: () => void;
}

export function InputButton(props: IButton): JSX.Element {
  const { name } = props;
  return (
    <input
      className={styles.btn}
      value={name}
      type="button"
      onClick={props.onClick}
    />
  );
}
