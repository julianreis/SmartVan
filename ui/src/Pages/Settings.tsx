import React from "react";
import styled from "styled-components";
import DeviceList from "../components/DeviceList/DeviceList";

const Wrapper = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${p => p.theme.globalPage.color};
`;

export default function Settings() {
  return (
    <Wrapper>
      <DeviceList />
    </Wrapper>
  );
}
