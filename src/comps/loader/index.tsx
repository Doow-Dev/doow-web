import React from "react";
import { Circles, MagnifyingGlass } from "react-loader-spinner";
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
        // glassColor="#c0efff"
        color="#04475E"
      />
    </div>
  );
}
