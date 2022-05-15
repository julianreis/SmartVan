import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useSettingsContext } from "./context/SettingContext";
import Header from "./Header";
import { light } from "./styles/themes";

const Content = styled.div``;

const Main = styled.main`
  background-color: ${p => p.theme.globalPage.background};
  min-height: 100vh;
`;

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
            <Content>{props.children}</Content>
          </Main>
        </ThemeProvider>
      </Router>
    </>
  );
}
