import { styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../icons";

const ButtonWrapper = styled("div")({
  display: "flex",
  margin: "50px 40px",
  justifyContent: "space-between",
  flexWrap: "wrap"
})
  
const LinkButton = styled(Link)(({theme}) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80px",
  width: "80px",
  padding: "16px",
  margin: "10px",
  boxShadow: theme.shadows[10],
  textDecoration: "none",
}))

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
