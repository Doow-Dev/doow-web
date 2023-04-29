import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/themes";
import { globalStyles } from "../../styles/themes/globalstyles";

export const Loading = () => {
  return (
    <Modal>
      <Container>
        <Spinner />
      </Container>
    </Modal>
  );
};

export default Loading;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media ${themes.breakpoints.lg} {
    padding-left: 0px;
  }
`;

const Modal = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: transparent;
  z-index: 99990999;
`;

const Spinner = styled.div`
  width: 35px;
  height: 35px;
  margin-top: 120px;
  border-radius: 50%;
  border: 5px solid ${globalStyles.colors.primary};
  border-top-color: transparent;
  animation: spin 0.8s infinite linear;

  @media ${themes.breakpoints.md} {
    width: 30px;
    height: 30px;
    border: 4px solid ${globalStyles.colors.primary};
    border-top-color: transparent;
  }

  @media ${themes.breakpoints.sm} {
    width: 25px;
    height: 25px;
    margin-top: 350px;
    border: 3px solid ${globalStyles.colors.primary};
    border-top-color: transparent;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
