import styled from "styled-components";

const BottomNav = styled.div`
  width: 100%;
  height: 50px;
  position: sticky;
  top: 0;
  background-color: black;
`;

export default function Footer() {
  return <BottomNav></BottomNav>;
}
