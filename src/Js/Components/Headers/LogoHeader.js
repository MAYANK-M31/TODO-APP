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

import Logo from "../../../Assets/Logo.png";
import "../../../Css/Headers/LogoHeader.css";

const LogoHeader = (props) => {
  return (
    <div>
      <Menu borderless className={"MenuHeader"} style={fixedMenuStyle}>
        <div className={"sixteen wide column right"}>
          <Menu.Item style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"99vw"}}  content={""}>
            <Image className={"LogoImg"} src={Logo} />
            <a
              style={{ float: "right" }}
              class="github-button"
              href="https://github.com/MAYANK-M31"
              data-size="large"
              aria-label="Follow @MAYANK-M31 on GitHub"
            >
              Follow
            </a>
          </Menu.Item>

        </div>
      </Menu>
    </div>
  );
};

const fixedMenuStyle = {
  backgroundColor: "white",
  height: "87px",
  display:"flex",
  flexDirection:"row",
};





export default LogoHeader;
