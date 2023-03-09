import React, { useState } from "react";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import {
  Container,
  ErrorText,
  IconImage,
  Input,
  InputContainer,
  LabelText,
} from "./custom-input.element";

interface Props {
  label?: string;
  secured?: boolean;
  value: string | number;
  multiline?: boolean;
  error?: string;
  margin?: string;
  placeholderText?: string;
  padding?: number;
  type?: string;
  height?: string;
  width?: string;
  size?: number;
  labelColor?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<Props> = (props) => {
  const {
    secured,
    label,
    handleChange,
    value,
    multiline,
    margin,
    error,
    height,
    width,
    padding,
    placeholderText,
    type,
    labelColor,
    size,
  } = props;
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  const toggleReveal = () => {
    setRevealPassword((currentState) => !currentState);
  };

  return (
    <Container margin={margin}>
      {label && <LabelText color={labelColor}>{label}</LabelText>}

      <InputContainer height={height}>
        <Input
          size={size}
          width={width}
          padding={padding}
          placeholder={placeholderText}
          type={
            secured
              ? revealPassword
                ? "text"
                : "password"
              : type
              ? type
              : "text"
          }
          value={value}
          onChange={handleChange}
        />
        {secured &&
          (revealPassword ? (
            // <BsFillEyeSlashFill
            //   style={{ cursor: "pointer" }}
            //   onClick={toggleReveal}
            //   width={18.03}
            //   height={15}
            // />
            <IconImage
              onClick={toggleReveal}
              src={"/assets/icons/eyeSharp.svg"}
              alt="icon"
              width={18.03}
              height={15}
            />
          ) : (
            // <IoEyeSharp
            //   style={{ cursor: "pointer" }}
            //   onClick={toggleReveal}
            //   width={18.03}
            //   height={15}
            // />
            <IconImage
              onClick={toggleReveal}
              src={"/assets/icons/eyeSlash.svg"}
              alt="icon"
              width={18.03}
              height={15}
            />
          ))}
      </InputContainer>
      <ErrorText>{error ? error : ""}</ErrorText>
    </Container>
  );
};

export default CustomInput;
