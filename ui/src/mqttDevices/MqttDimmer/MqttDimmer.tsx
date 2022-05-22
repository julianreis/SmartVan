import { Slider, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DashButton } from "../../components/dashContainer";
import { useMqttContext } from "../../context/MqttContext";
import { Icons } from "../../icons";

const IconContainer = styled("div")({
  height: "100px",
  width: "100px"

})
// <{ active: boolean }>`
//   color: ${p => (p.active ? " #666602" : " black")};
//   ${p => (p.active ? "filter: drop-shadow(3px 3px 2px yellow)" : "")};
// `;

const SwitchLabel = styled("span")({
  paddingLeft: "20px"
})
//   padding-left: 20px;
//   font-weight: bold;
//   color: ${p => p.theme.globalPage.color};
// `;


type Wifi = {
  AP: number;
  SSId: string;
  BSSId: string;
  Channel: number;
  RSSI: number;
  Signal: number;
  LinkCount: number;
  Downtime: string;
};

type Result = {
  Dimmer: number;
};

type Status = {
  Time?: string;
  Uptime?: string;
  UptimeSec?: number;
  Heap?: number;
  SleepMode?: string;
  Sleep?: number;
  LoadAvg?: number;
  MqttCount?: number;
  POWER: "ON" | "OFF";
  Wifi?: Wifi;
};

type Props = {
  mqttTopic: string;
  name: string;
};

export default function MqttDimmer({ mqttTopic, name }: Props) {
  const [value, setValue] = useState<number>(0);
  const [devStatus, setDevStatus] = useState<string>("");
  const { publish, client, subscribe, unSubscribe } = useMqttContext();

  const handleIncommingMSG = (topic: string, msg: Buffer) => {
    const message = msg.toString();
    const msgTyp = topic.replace(mqttTopic, "");

    console.log("🔦", topic, " - ", message);

    switch (msgTyp) {
      case "/tele/LWT":
        setDevStatus(message);
        break;
      case "/tele/STATE":
        try {
          const status: Status = JSON.parse(message);
          console.log("Status: ", status);
        } catch (e) {
          console.log(e);
        }
        break;
      case "/stat/RESULT":
        const result: Result = JSON.parse(message);
        setValue(result.Dimmer);

        break;
      case "/stat/POWER":
        console.log("Power CMD");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const topic = mqttTopic + "/#";
    if (client) {
      console.log("subscribe to ", topic);
      subscribe(topic);
      publish(mqttTopic + "/cmnd/dimmer", "", 0);
    }
    return () => {
      if (client) {
        console.log("cleanUp");
        unSubscribe(topic);
      }
    };
  }, [mqttTopic]);

  useEffect(() => {
    if (client) {
      client.on("message", (topic, message) => {
        if (topic.includes(mqttTopic)) {
          handleIncommingMSG(topic, message);
        }
      });
    }
  }, [client]);

  const valuetext = (value: number) => {
    return `${value}%`;
  };

  const valueChange = (event: any, val: number | number[]) => {
    if (!Array.isArray(val)) {
      setValue(val);
    }
  };

  const sendValue = () => {
    console.log("Send: ", mqttTopic, "/cmnd/dimmer", value.toString());
    publish(mqttTopic + "/cmnd/dimmer", value.toString(), 0);
  };

  return (
    <DashButton>
      <IconContainer>
        {Icons.light}
      </IconContainer>
      <SwitchLabel>{name}</SwitchLabel>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
        onChange={valueChange}
        onChangeCommitted={sendValue}
        value={value}
      />
      <div>{devStatus}</div>
    </DashButton>
  );
}
