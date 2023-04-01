import React, { CSSProperties } from "react";
import { FaInfo, FaCheck, FaExclamationCircle } from "react-icons/fa";

interface IIcons {
  color: string;
  icon: JSX.Element;
}
export function getIcon(type: string): IIcons {
  switch (type) {
    case "success":
      return {
        icon: <FaCheck />,
        color: "green",
      };
    case "info":
      return {
        icon: <FaInfo />,
        color: "#026eb1",
      };
    case "error":
      return {
        icon: <FaExclamationCircle />,
        color: "red",
      };
    default:
      return {
        icon: <FaCheck />,
        color: "green",
      };
  }
}

interface IToastMessages {
  type: "success" | "info" | "error";
  message: string;
}

export default function ToastMessage(props: IToastMessages) {
  return (
    <div style={{ ...containerStyle, borderColor: getIcon(props.type).color }}>
      <div style={{ ...iconStyle, color: getIcon(props.type).color }}>
        {getIcon(props.type).icon}
      </div>
      <div style={{ ...textStyle, color: getIcon(props.type).color }}>
        {props.message}
      </div>
    </div>
  );
}

const containerStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "10px 10px",
  // width: "220px",
  position: "fixed",
  right: "10px",
  top: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  transition: "1s ease-in",
  borderWidth: "0.5px",
  borderStyle: "solid",
};

const iconStyle: CSSProperties = {
  color: "green",
  marginRight: "10px",
  borderRadius: "3px",
};
const textStyle: CSSProperties = {
  fontSize: "small",
};
