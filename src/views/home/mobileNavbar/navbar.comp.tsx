import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./navbar.module.scss";
import MobileProductsSideBar from "./products";
import MobileUseCaseSideBar from "./usecase";
import { MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import NavFooter from "./NavFooter";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileSideBar(props: IProps) {
  const router = useRouter();
  const _path = router.pathname.toString();
  const [showInnerSec, setInnerSec] = useState({
    activeTab: "CLOSE",
  });
  const width = 800;

  return (
    <>
      <motion.div
        animate={{ x: props.isOpen ? 0 : -width }}
        initial={{ x: -width }}
        transition={{ duration: 0.01, type: "spring" }}
        className={styles.navbar}
      >
        <div className={styles.listContainer}>
          {/* <p onClick={() => props.onClose()}>Close</p> */}

          <div onClick={() => setInnerSec({ activeTab: "PRODUCTS" })}>
            <p>Products</p>
            <MdKeyboardArrowRight />
          </div>
          <div onClick={() => setInnerSec({ activeTab: "SOLUTIONS" })}>
            Solutions
            <MdKeyboardArrowRight />
          </div>
          <div
            className={styles.sliderItem}
            onClick={() => router.push("/login")}
          >
            Login
          </div>
        </div>
        <NavFooter />
      </motion.div>
      {showInnerSec.activeTab === "PRODUCTS" && (
        <MobileProductsSideBar
          onClose={() => setInnerSec({ activeTab: "CLOSE" })}
          isOpen={props.isOpen}
        />
      )}
      {showInnerSec.activeTab === "SOLUTIONS" && (
        <MobileUseCaseSideBar
          isOpen={props.isOpen}
          onClose={() => setInnerSec({ activeTab: "CLOSE" })}
        />
      )}
    </>
  );
}
