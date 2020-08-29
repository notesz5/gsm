import React from "react";
import { Bars } from "svg-loaders-react";

import "../styles/loadingScreen.scss";

export default function LoadingScreen() {
  return (
    <>
      <div className="blurredBox" />
      <div className="tableLoader">
        <Bars className="loaderIcon" />
      </div>
    </>
  );
}
