import React from "react";
import styles from "./select.module.scss";

interface Props {
  title: string;
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  label: string;
}

export const Select: React.FC<Props> = ({ options, title }) => {
  return (
    <div className={styles.select_container}>
      <select
        title={title}
        onChange={(e) => console.log(e.currentTarget.value)}
      >
        <option value={""}>{title}</option>
        {options.map((option, idx) => (
          <option value={option.value} key={idx}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
