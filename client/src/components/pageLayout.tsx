import React, { useState} from "react";

import SideBar from "./sideBar";
import TopBar from "./topBar";

import "../styles/pagelayout.scss";

import { IAuthProvider, withAuth } from "../context/auth";

interface PageLayoutProps {
  context: IAuthProvider;
}

function PageLayout<PageLayoutProps>({ context, children }) {
  const [open, setOpen] = useState<boolean>(false);


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen(!open);
  }

 

  return (
    <>
      <TopBar
        userName={context.userName}
        logOut={context.logout}
      />
      <SideBar
        isOpen={open}
        close={handleDrawerClose}
        toggleOpen={toggleOpen}
      />
      <div className={"content ".concat(open ? "open" : "closed")}>
        {children}
      </div>
    </>
  );
}

export default withAuth(PageLayout);
