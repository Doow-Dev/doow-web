import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { themes } from "../../themes";

interface CustomButtonProps {
  plain?: boolean;
  bgColor?: string;
  color?: string;
  width?: string;
  height?: string;
}

interface Props {
  title: string;
  plain?: boolean;
  bgColor?: string;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  titleColor?: string;
  onClickHandler?: () => void;
}

export const Button: React.FC<Props> = (props) => {
  const {
    onClickHandler,
    title,
    plain,
    bgColor,
    titleColor,
    width,
    height,
    type,
  } = props;
  return (
    <StyledButton
      plain={plain}
      bgColor={bgColor}
      color={titleColor}
      width={width}
      height={height}
      onClick={onClickHandler}
      type={type || "button"}
    >
      {title}
    </StyledButton>
  );
};

const StyledButton = styled.button<CustomButtonProps>`
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  color: ${({ color }) => (color ? color : "#000")};
  background-color: ${({ plain, bgColor }) =>
    plain ? "transparent" : bgColor};
  transition: opacity 0.3s ease-in-out;
  padding: 0px;
  &:hover {
    opacity: 0.8;
  }
`;
