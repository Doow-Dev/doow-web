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
        color: "#035CA0",
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
    <div style={containerStyle}>
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
  backgroundColor: "#fff",
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
};

const iconStyle: CSSProperties = {
  color: "green",
  marginRight: "10px",
};
const textStyle: CSSProperties = {
  fontSize: "small",
};
