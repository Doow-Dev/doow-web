import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import Colors from "../../../constants/colors";
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
        color={Colors.primaryColor}
      />
    </div>
  );
}
