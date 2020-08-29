import React from "react";

import MenuItem from "./menuItem";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import PhoneIcon from "@material-ui/icons/PhoneIphone";
import PeopleIcon from "@material-ui/icons/People";

import "../styles/sideBar.scss";

interface SideBarProps {
  isOpen: boolean;
  close: () => void;
  toggleOpen: () => void;
}

const menuItems = [
  {
    name: "Phones",
    link: "/phones",
    Icon: PhoneIcon,
  },

  {
    name: "Partners",
    link: "/clients",
    Icon: PeopleIcon,
  },
];

export default function SideBar(props: SideBarProps) {
  return (
    <ClickAwayListener onClickAway={props.close}>
      <div>
        <IconButton className="menuIcon" onClick={props.toggleOpen}>
          {props.isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Drawer
          className={props.isOpen ? "sideBarOpen" : "sideBarClosed"}
          variant="permanent"
        >
          {menuItems.map((item, index) => (
            <MenuItem {...item} key={index} className="menuItem" />
          ))}
        </Drawer>
      </div>
    </ClickAwayListener>
  );
}
