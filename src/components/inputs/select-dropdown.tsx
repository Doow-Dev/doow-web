import React from "react";
import styled from "styled-components";
import Select, { DropdownIndicatorProps, StylesConfig } from "react-select";
import { globalStyles } from "../constants";
import { themes } from "../../themes";
import { IconImage } from "./custom-input.element";

export interface OptionsInterface {
  value: string;
  label: string;
  customAbbreviation?: string;
}

interface Props {
  options?: OptionsInterface[];
  label?: string;
  error?: string;
  width?: string;
  placeholderText?: string;
  labelMargin?: string;
  handleChange: (e: any) => void;
}

const customStyle: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    "&:hover": {
      outline: "1px solid green",
      boxShadow: state.isFocused ? "0 0 0 1px green" : "none",
      border: state.isFocused ? "0 0 0 1px green" : "none",
    },
    outline: "none",
    backgroundColor: "transparent",
    borderRadius: "8px",
    height: "48px",
    width: "100%",
    border: "1px solid lightgray",
  }),
  placeholder: (styles) => ({
    ...styles,
    fontFamily: "Inter",
    fontSize: "14px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: globalStyles.colors.black800,
    width: "30px",
    cursor: "pointer",
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
  container: (styles) => ({ ...styles, margin: "3px 0px" }),
  option: (styles) => ({
    ...styles,
    fontSize: "14px",
  }),
  valueContainer: (styles) => ({
    ...styles,
    fontSize: "14px",
    fontFamily: "Inter",
    backgroundColor: "transparent",
  }),
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <IconImage
      style={{ marginRight: "10px" }}
      src={"/assets/icons/arrowDown.svg"}
      height={10}
      width={10}
      alt="down arrow icon"
    />
  );
};

export const SelectDropdown: React.FC<Props> = (props) => {
  const {
    label,
    options,
    placeholderText,
    error,
    handleChange,
    width,
    labelMargin,
  } = props;
  return (
    <Container width={width}>
      {label && <LabelText margin={labelMargin}>{label}</LabelText>}
      <Select
        options={options}
        placeholder={placeholderText}
        styles={customStyle}
        components={{ DropdownIndicator }}
        onChange={(e: any) => handleChange(e.value)}
      />
      <ErrorText>{error ? error : ""}</ErrorText>
    </Container>
  );
};

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "100%"};

  @media ${themes.breakpoints.sm} {
    width: 100%;
  }
`;

const LabelText = styled.p<{ margin?: string }>`
  /* font-size: 14px;
  font-weight: 500;
  margin: ${({ margin }) => (margin ? margin : "0")}; */
  font-size: 16.5px;
  @media ${themes.breakpoints.sm} {
    font-size: 14px;
  }
`;

const ErrorText = styled.p`
  font-size: 13px;
  color: ${globalStyles.colors.fail};
`;
