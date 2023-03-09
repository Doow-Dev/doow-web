import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#04475E"
      />
    </div>
  );
}
