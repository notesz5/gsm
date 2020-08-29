import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "../styles/topBar.scss";

interface TopBarProps {
  userName: string;
  logOut: () => void;
}

export default function topBar(props: TopBarProps) {
  return (
    <AppBar className="topBar" position="fixed">
      <div className="grow" />
      <Typography variant="h6" className="userName">
        {props.userName}
      </Typography>
      
        <IconButton className="topBarIcon" onClick={props.logOut}>
        <Tooltip title="Sign Out" arrow>
          <ExitToAppIcon />
          </Tooltip>
        </IconButton>
      
    </AppBar>
  );
}
