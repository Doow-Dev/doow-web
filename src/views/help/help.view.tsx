import React from "react";
import styles from "./help.module.scss";
import Link from "next/link";
import { FaRegAddressCard } from "react-icons/fa";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FcBarChart, FcFaq } from "react-icons/fc";
import { SideBar } from "../../comps/sidebar/sidebar";
import NavBar from "../../comps/navbar/navbar.comp";

import { MdAccountCircle } from "react-icons/md";

export default function HelpView() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <div className={styles.help}>
        {/* <NavBar title={"Title"} /> */}
        <div className={styles.container}>
          <h1>Help Section</h1>
          <div className={styles.gridContainer}>
            <Link href="/help/accounts">
              <div>
                <MdAccountCircle className={styles.icon} />
                <h3>Accounts</h3>
              </div>
            </Link>
            <Link href="/help/agent_management">
              <div>
                {/* <FaRegRegistered className={styles.icon} /> */}
                <FaRegAddressCard className={styles.icon} />
                <h3>Agents Manager</h3>
              </div>
            </Link>
            <Link href="/help/chat">
              <div>
                <BsFillChatLeftDotsFill className={styles.icon} />
                <h3>Chat</h3>
              </div>
            </Link>
            <Link href="/help/visualize">
              <div>
                <FcBarChart className={styles.icon} />
                <h3>Visualize</h3>
              </div>
            </Link>
            <Link href="/help/submission">
              <div>
                <FcFaq className={styles.icon} />
                <h3>Submission</h3>
              </div>
            </Link>
            <Link href="/help/reports">
              <div>
                <FcFaq className={styles.icon} />
                <h3>Incidents Reports</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
