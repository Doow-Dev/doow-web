import React from "react";
import { Circles, InfinitySpin, MagnifyingGlass } from "react-loader-spinner";
import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Circles
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        color="#63ff61"
      />
    </div>
  );
}
