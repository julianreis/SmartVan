import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import DarkmodeSwitch from "./components/DarkmodeSwitch";
import { ConnectionStatus, useMqttContext } from "./context/MqttContext";
import { useSettingsContext } from "./context/SettingContext";
import { dark, light } from "./styles/themes";


const Menu = styled("div")(({theme}) => ({
  width: "100%",
  zIndex: 100,
  position: "sticky",
  top: "0",
  color: theme.palette.primary.main,
  boxShadow: theme.shadows[1]
}))


const Nav = styled("nav")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "16px 24px"
})

const FlowContainer = styled("div")({
  display: "flex",
  alignItems: "center"
})

const Status = styled("div")<{status: ConnectionStatus}>(({status}) => ({
  height: "20px",
  width: "20px",
  marginRight: "10px",
  borderRadius: "50%",
  border: "1px solid black",
  backgroundColor: status === ConnectionStatus.Connectet ? "green" : "red"
}))
  

const LinkButton = styled(Link)({
  padding: "6px",
  textDecoration: "none",
  fontSize: "16px",
  
  "a": {
    textDecoration: "none",
  }
})

const Titel = styled("span")({
  fontSize: "18px",
  fontWeight: "bold"
})

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
          <Status status={connectStatus}/>

          <DarkmodeSwitch
            id={"ID"}
            checked={theme?.palette.mode === "dark"}
            onChange={e => setTheme(e.target.checked ? dark : light)}
          />
        </FlowContainer>
      </Nav>
    </Menu>
  );
}
