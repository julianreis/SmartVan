import { styled } from "@mui/material";

const BottomNav = styled("div")({
  width: "100%",
  height: "50px",
  position: "sticky",
  top: 0,
  backgroundColor: "black"
})
  
export default function Footer() {
  return <BottomNav></BottomNav>;
}
