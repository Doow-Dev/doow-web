import { useRouter } from "next/router";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { GlobalLinks } from "../../../helper/links";
import styles from "./modal.module.scss";

interface IModal {
  heading: string;
  name: string;

  content: string;
  position: string;
  btnVal: string;
  onClose: () => void;
}
export default function WaitListModal(props: IModal) {
  const { heading, name, content, position, btnVal, onClose } = props;
  const router = useRouter();
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <CloseBtn onClick={onClose}>
          <AiOutlineClose size={20} color="#93BA99" />
        </CloseBtn>
        <div className={styles.sectionContent}>
          {/* <CloseBtn value="Close" onClick={props.onClose}> */}

          <Img src="../images/congrats.png" alt="Congratulations" />
        </div>
        <div className={styles.sectionContent}>
          <h1>{name}</h1>
          <p>
            We can't wait to show you what modern finance should
            feel like.
          </p>
        </div>

        <div className={styles.sectionContent}>
          <p>{content}</p>
        </div>

        <div className={styles.sectionContentBtn}>
          <Btn
            value={btnVal}
            onClick={() => router.push(GlobalLinks.external.survey)}
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

const CloseBtn = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  margin: 10px;
  font-size: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    color: "#07c524";
  }
  &:hover {
    color: #7d0c17;
  }
`;
