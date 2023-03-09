import React, { createContext, useEffect, useState } from "react";

interface MenuStateInteface {
  open: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
}

interface ProviderInterface {
  children: React.ReactNode;
}

const initialValue: MenuStateInteface = {
  open: false,
  closeMenu: () => {},
  toggleMenu: () => {},
};

const MenuContext = createContext<MenuStateInteface>(initialValue);

export const MenuContextProvider: React.FC<ProviderInterface> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenuHandler = () => {
    setMenuOpen(false);
  };

  const toggleMenuHandler = () => {
    setMenuOpen((currentState) => !currentState);
  };
  const value: MenuStateInteface = {
    open: menuOpen,
    closeMenu: closeMenuHandler,
    toggleMenu: toggleMenuHandler,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuContext;
