import styled from "styled-components";
import { globalStyles } from "../constants";
import Image from "next/image";

export const Container = styled.div<{ margin?: string }>`
  width: 100%;
  /* margin-top: 30px; */
  margin: ${({ margin }) => margin && margin};
`;

export const InputContainer = styled.div<{ height?: string }>`
  width: 100%;
  min-height: ${({ height }) => height || "48px"};
  border-radius: 8px;
  margin: 3px 0px;
  padding: 0px 10px 0px 5px;
  display: flex;
  border: 1px solid #ccc;
  align-items: center;
  justify-content: space-between;

  &:has(input:focus) {
    border: 2px solid #2684ff;
  }

  & svg {
    transition: opacity 0.5s ease-in-out;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const LabelText = styled.p<{ color?: string }>`
  font-size: 14px;
  line-height: 16.94px;
  font-weight: 500;
  color: ${({ color }) => (color ? color : "black")};
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: ${globalStyles.colors.fail};
`;

export const Input = styled.input<{
  padding?: number;
  width?: string;
  color?: string;
  size?: number;
}>`
  height: 100%;
  width: ${({ width }) => width || "90%"};
  padding: ${({ padding }) => padding || 5}px;
  font-size: ${({ size }) => (size ? size : 14)}px;
  outline: none;
  border: none;
  background-color: transparent;
  letter-spacing: 1.5px;

  /* fix the chrome blue autocomplete bg color */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const IconImage = styled(Image)<{
  width?: number;
  height?: number;
  padding?: string;
}>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 0px;
  padding: ${({ padding }) => (padding ? padding : "0px")};
`;
