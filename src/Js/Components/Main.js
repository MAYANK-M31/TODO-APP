import React from "react";
import MainContainer from "./Container/MainContainer";
import BoardHeader from "./Headers/BoardHeader";
import LogoHeader from "./Headers/LogoHeader";

const Main = (props) => {
  return (
    <div>
      <LogoHeader />
      <BoardHeader />
      <MainContainer/>
    </div>
  );
};

export default Main;
