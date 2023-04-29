import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import styles from "./modal.module.scss";

interface IModal {
  heading: string;
  name: string;
  content: string;
  content2: string;
  position: string;
  btnVal: string;
  onClose: () => void;
}
export default function WaitListModal(props: IModal) {
  const router = useRouter();
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <CloseBtn value="Close" onClick={props.onClose} type="button" />
        <div className={styles.sectionContent}>
          {/* <CloseBtn value="Close" onClick={props.onClose}> */}
          {/* <AiOutlineCloseCircle color="red" size={20} /> */}
          <Img src="./images/congrats.png" alt="Congratulations" />
        </div>
        <div className={styles.sectionContent}>
          <h1>{props.name}</h1>
          <p>{props.content}</p>
        </div>

        <div className={styles.sectionContent}>
          <p>{props.content2}</p>
        </div>

        <div className={styles.sectionContentBtn}>
          <Btn
            value={props.btnVal}
            onClick={() => router.push("https://forms.gle/Mr5ASnNkyrYawCMT6")}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

const Img = styled.img`
  height: 105px;
  width: 200px;
`;

const Btn = styled.input`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 20px;
  background-color: #07c524;
  font-size: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 10px;
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
  color: #fff;

  &:hover {
    background-color: #65ed7c;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #65ed7c;
    outline: none;
    border: 1px solid #304169;
    box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
      inset 0px 0px 4px rgba(20, 20, 55, 0.3);
  }
`;

const CloseBtn = styled.input`
  /* width: 200px; */
  position: absolute;
  right: 0;
  top: 0;
  /* height: 3.5rem; */
  padding: 5px 10px;
  margin: 10px;
  background-color: #c5071a;
  font-size: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.5s ease;
  border-radius: 20px;
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
  color: #fff;

  &:hover {
    background-color: #7d0c17;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #c62132;
    outline: none;
    border: 1px solid #304169;
    box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
      inset 0px 0px 4px rgba(20, 20, 55, 0.3);
  }
`;
