import React from "react";
import MarkdownIt from "markdown-it";
import styles from "./note.module.scss";
import { SideBar } from "../../../comps/sidebar/sidebar";
import NavBar from "../../../comps/navbar/navbar.comp";

type HelpProperties = {
  content: string;
};

export default function NoteView(props: HelpProperties) {
  const md = new MarkdownIt();
  const cc = md.render(props.content);
  return (
    <div>
      <SideBar />
      <NavBar />
      <div className={styles.markdown_section}>
        <div dangerouslySetInnerHTML={{ __html: cc }}></div>
      </div>
    </div>
  );
}
