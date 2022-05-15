import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import MqttDimmer from "../mqttDevices/MqttDimmer/MqttDimmer";
import MqttSwitch from "../mqttDevices/Switch/MqttSwitch";

const Headline = styled.div`
  padding-top: 5vh;
  display: flex;
  justify-content: center;
  color: ${p => p.theme.globalPage.color};
`;

const Wrapper = styled.div`
  padding: 40px 100px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  color: ${p => p.theme.globalPage.color};
`;

export default function Lights() {
  return (
    <>
      <Headline>
        <Typography variant="h4" gutterBottom>
          Lichter
        </Typography>
      </Headline>

      <Wrapper>
        <MqttSwitch
          label={"Switch 1"}
          mqttTopic="/Main/Wifi_Relais1_4"
          channel={"1"}
        ></MqttSwitch>
        <MqttSwitch
          label={"Switch 2"}
          mqttTopic="/Main/Wifi_Relais1_4"
          channel={"2"}
        ></MqttSwitch>
        <MqttSwitch
          label={"Switch 3"}
          mqttTopic="/Main/Wifi_Relais1_4"
          channel={"3"}
        ></MqttSwitch>
        <MqttSwitch
          label={"Switch 4 🤪"}
          mqttTopic="/Main/Wifi_Relais1_4"
          channel={"4"}
        ></MqttSwitch>
        {/* <MqttSwitch
          label={"Standheizung"}
          mqttTopic="/Main/Standheizung"
        ></MqttSwitch> */}
        <MqttDimmer name={"Licht 1"} mqttTopic="/Main/Licht1"></MqttDimmer>
        <MqttDimmer name={"Licht 2"} mqttTopic="/Main/Licht2"></MqttDimmer>
        <MqttDimmer name={"Licht 3"} mqttTopic="/Main/Licht3"></MqttDimmer>
        <MqttDimmer name={"Licht 4"} mqttTopic="/Main/Licht4"></MqttDimmer>
      </Wrapper>
    </>
  );
}