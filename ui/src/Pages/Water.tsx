import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import MqttLevel from "../mqttDevices/MqttLevel/MqttLevel";
import MqttWeight from "../mqttDevices/MqttWeight/MqttWeight";

const Headline = styled("div")({
  display: "flex",
  paddingTop: "5vh",
  justifyContent: "center"
})
  
const Wrapper = styled("div")({
  padding: "40px 100px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center"
})
  
export default function Water() {
  return (
    <>
      <Headline>
        <Typography variant="h4" gutterBottom>
          Wasser
        </Typography>
      </Headline>

      <Wrapper>
        <MqttLevel
          name={"Frischwasser"}
          mqttTopic="Main/Frischwasser/Analog"
        ></MqttLevel>
        <MqttWeight
          name={"Gas"}
          mqttTopic="Main/Gas_Waage/WeightChanA"
        ></MqttWeight>
      </Wrapper>
    </>
  );
}
