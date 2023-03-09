import React from "react";

export interface SideNavMenuItems {
  title?: string;
  icon?: string;
  link: string;
}

export interface SideNavDataInterface {
  sideNavMenuItems: SideNavMenuItems[];
  component: React.FC<any>;
}

export interface AgentDashbaordInterface {
  showSideNav: boolean;
}
