import React, { useState } from "react";
import styled, { css } from "styled-components";

export interface ISelectOption {
  value: string;
  imgUrl?: string;
}

interface Props {
  label: string;
  options: ISelectOption[];
  title?: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SelectComp: React.FC<Props> = ({
  label,
  onChange,
  options,
  title,
  error
}) => {
  const [currentValue, SetCurrentValue] = useState("");
  const [open, SetOpen] = useState<boolean>(false);

  const handleOpen = () => {
    SetOpen(true);
  };
  const handleClose = () => {
    SetOpen(false);
  };
  const handleValueChange = (value) => {
    SetCurrentValue(value);
  };
  const handleChange = (value) => {
    handleValueChange(value);
    // call method, if it exists
    if (onChange) {
      onChange(value);
    }
    // close, after all tasks are finished
    handleClose();
  };
  return (
    <>
      {title && <Label>{title}</Label>}
      <SelectContainer>
        <SelectLabelButton
          onClick={handleOpen}
          isSelected={currentValue !== ""}
        >
          {currentValue !== "" ? currentValue : label}
        </SelectLabelButton>
        <DropdownStyle isVisible={open}>
          {options.map((item, index) => (
            <DropdownItem
              onClick={() => handleChange(item.value)}
              active={item.value === currentValue}
              key={index}
            >
              {/* <p>{value}</p> */}
              <div>
                {item.imgUrl && <img src={item.imgUrl} />}
                <p>{item.value}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownStyle>
      </SelectContainer>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default SelectComp;

const SelectContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: fit-content;
`;

const SelectLabelButton = styled.button<{ isSelected: boolean }>`
  min-width: 7rem;
  width: 100%;
  padding: ${({ isSelected }) => (isSelected ? "1.2rem" : "1.2rem")};
  font-size: 1.5rem;
  background-color: #fff;
  border: none;
  border-radius: 0.5rem;
  color: #555;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid slategrey;
  cursor: pointer;
  border: 1px solid #ccc;

  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

const DropdownStyle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 40vmax;

  width: 100%;
  /* height: 100%; */
  min-width: 10rem;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fafafa;
  /* border: 1.5px solid slategrey; */
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;

  transition: max-height 0.2s ease;
  overflow: scroll;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}

  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
  }
`;

const DropdownItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  text-align: left;
  /* margin: 0.15rem 0; */
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #333;
  border-radius: 0.3rem;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #166edc;
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #eee;
    color: #555;
    outline: none;
  }

  & div {
    display: flex;
    align-items: center;
    gap: 10px;

    & > img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;

const Label = styled.p`
  font-size: 1.5rem;
`;

const Error = styled.p`
  color: red
`
