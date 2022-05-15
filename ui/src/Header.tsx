import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DarkmodeSwitch from "./components/DarkmodeSwitch";
import { ConnectionStatus, useMqttContext } from "./context/MqttContext";
import { useSettingsContext } from "./context/SettingContext";
import { dark, light } from "./styles/themes";

const Menu = styled.div`
  z-index: 100;
  width: 100%;
  position: sticky;
  top: 0;
  background-color: ${p => p.theme.secondary};
  box-shadow: 0 10px 6px -6px ${p => p.theme.shadowColor};
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
`;

const FlowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.div<{ status: ConnectionStatus }>`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${p =>
    p.status === ConnectionStatus.Connectet
      ? "green"
      : p.status === ConnectionStatus.Reconnect
      ? "yellow"
      : "red"};
`;

const LinkButton = styled(Link)`
  padding: 6px;
  text-decoration: none;
  color: ${p => p.theme.globalPage.color};
  font-size: 16px;

  a {
    text-decoration: none;
  }
`;

const Titel = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export default function Header() {
  const { theme, setTheme } = useSettingsContext();
  const { connectStatus } = useMqttContext();

  return (
    <Menu>
      <Nav>
        <LinkButton to="/">
          <Titel>Smart Van</Titel>
        </LinkButton>

        <FlowContainer>
          <Status status={connectStatus} />

          <DarkmodeSwitch
            id={"ID"}
            checked={theme?.themeName === "dark"}
            onChange={e => setTheme(e.target.checked ? dark : light)}
          />
        </FlowContainer>
      </Nav>
    </Menu>
  );
}
