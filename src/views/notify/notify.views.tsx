import React from "react";
import ModalComp from "../../comps/modal";
import NavBar from "../../comps/navbar/navbar.comp";
import { SideBar } from "../../comps/sidebar/sidebar";
import styles from "./notify.module.scss";

interface IMessages {
  message: string;
  from: string;
  seen: string;
}
const messages: IMessages[] = [
  {
    message: "Meeting will be held tomorrow by 12pm",
    from: "STATE",
    seen: "Read",
  },
  {
    message:
      "Messages Update. It's time to collect your expression of intrest form.",
    from: "STATE",
    seen: "Read",
  },
  {
    message:
      "Messages Update. It's time to collect your expression of intrest form.",
    from: "NATIONAL",
    seen: "Unread",
  },
];
export default function NotificationView() {
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.contents}>
          <p className={styles.sectionTitle}>Notifications</p>
          {messages.map((v, i) => (
            <div className={styles.card} key={i}>
              <p className={styles.from}>{v.from}</p>
              <p className={styles.message}>{v.message}</p>
              <p className={styles.seen}>{v.seen}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // return <ModalComp />;
}
