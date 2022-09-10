import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderWrapper>ISSUES</HeaderWrapper>;
};

const HeaderWrapper = styled.header`
  height: 120px;
  background-color: #24292f;
  color: white;
  text-align: center;
  line-height: 120px;
  font-size: 1.5em;
`;

export default Header;
