import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icons } from "../icons";

const ButtonWrapper = styled.div`
  display: flex;
  margin: 50px 40px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LinkButton = styled(Link)`
  background-color: ${p => p.theme.button.background};
  color: ${p => p.theme.button.color};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 10px 6px -6px ${p => p.theme.shadowColor};

  text-decoration: none;
  color: black;
  font-size: 16px;

  a {
    text-decoration: none;
    color: ${p => p.theme.button.color};
  }

  > div {
    padding-top: 10px;
    color: ${p => p.theme.button.color};
  }

  > svg {
    color: ${p => p.theme.button.color};
  }
`;

export default function Startpage() {
  return (
    <>
      <ButtonWrapper>
        <LinkButton to="/Lights">
          {Icons.light}
          <div>Licht</div>
        </LinkButton>
        <LinkButton to="/Water">
          {Icons.water}
          <div>Wasser</div>
        </LinkButton>
        <LinkButton to="/Settings">
          {Icons.settings}
          <div>Einstellung</div>
        </LinkButton>
      </ButtonWrapper>
    </>
  );
}
