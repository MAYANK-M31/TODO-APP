import React from "react";
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table,
} from "semantic-ui-react";

import { ReactComponent as Add } from "../../../Assets/Add.svg";
import "../../../Css/Headers/BoardHeader.css";
import useWindowDimensions from "../../../Tools/WindowDimenstion";
import InputTask from "./InputView/InputTask";
import CompletedTask from "./ListView/CompletedTask";
import NewTask from "./ListView/NewTask";
import toast, { Toaster } from "react-hot-toast";

const MainContainer = () => {
  const { height, width } = useWindowDimensions();

  console.log(height, width);

  return (
    <div
      className={
        width <= 800
          ? "three column stackable ui grid padded MainContainer"
          : "three column stackable ui grid padded"
      }
    >
      <Toaster />

      {width <= 800 ? (
        <>
          <InputTask />
          <NewTask />
          <CompletedTask />
        </>
      ) : (
        <>
          <NewTask />
          <InputTask />
          <CompletedTask />
        </>
      )}
    </div>
  );
};

export default MainContainer;
