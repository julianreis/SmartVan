import { styled, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSettingsContext } from "./context/SettingContext";
import Header from "./Header";
import { light } from "./styles/themes";

const Main = styled("main")({
  minHeight: "100vh"
})
  // background-color: ${p => p.theme.globalPage.background};

type Props = {
  children: ReactNode;
};

export default function Skeleton(props: Props) {
  const { theme } = useSettingsContext();
  return (
    <>
      <Router basename={"van"}>
        <ThemeProvider theme={theme ? theme : light}>
          <Main>
            <Header></Header>
            <div>{props.children}</div>
          </Main>
        </ThemeProvider>
      </Router>
    </>
  );
}
