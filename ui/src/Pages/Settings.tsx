import { styled } from "@mui/material";
import DeviceList from "../components/DeviceList/DeviceList";

const Wrapper = styled("div")({
  padding: "30px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

export default function Settings() {
  return (
    <Wrapper>
      <DeviceList />
    </Wrapper>
  );
}
