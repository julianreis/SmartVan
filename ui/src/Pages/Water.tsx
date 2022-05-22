import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import MqttLevel from "../mqttDevices/MqttLevel/MqttLevel";
import MqttWeight from "../mqttDevices/MqttWeight/MqttWeight";

const Headline = styled("div")({
  display: "flex"
})
  // padding-top: 5vh;
  // display: flex;
  // justify-content: center;
  // color: ${p => p.theme.globalPage.color};


const Wrapper = styled("div")({
  padding: "40px 100px",
  display: "flex"
})
  
  // justify-content: center;
  // flex-wrap: wrap;
  // align-items: center;
  // color: ${p => p.theme.globalPage.color};

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
