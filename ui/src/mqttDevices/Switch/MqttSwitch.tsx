import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DashButton } from "../../components/dashContainer";
import { useMqttContext } from "../../context/MqttContext";
import { Icons } from "../../icons";

const IconContainer = styled.div<{ active: boolean }>`
  height: 100px;
  width: 100px;
  color: ${p => (p.active ? " #666602" : " black")};
  ${p => (p.active ? "filter: drop-shadow(3px 3px 2px yellow)" : "")};
`;

const SwitchLabel = styled.span`
  padding-left: 20px;
  font-weight: bold;
  color: ${p => p.theme.globalPage.color};
`;

const StatusLabel = styled.div``;

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
  POWER: "ON" | "OFF";
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
  label: string;
  channel?: string;
};

export default function MqttSwitch({ mqttTopic, label, channel }: Props) {
  const [active, setActive] = useState<boolean>(false);
  const [devStatus, setDevStatus] = useState<string>("");
  const { publish, client, subscribe, unSubscribe } = useMqttContext();
  const chan = channel ? channel : "";

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
          setActive(status.POWER === "ON" ? true : false);
        } catch (e) {
          console.log(e);
        }
        break;
      case "/stat/RESULT":
        const status: any = JSON.parse(message);

        try {
          const val = status["POWER" + chan];
          setActive(val === "ON" ? true : false);
        } catch (e) {
          console.log("error");
        }
        break;
      case "/stat/POWER":
        const power: Result = JSON.parse(message);
        setActive(power.POWER === "ON" ? true : false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log();
    const topic = mqttTopic + "/#";
    if (client) {
      console.log("subscribe to ", topic);
      subscribe(topic);
      publish(mqttTopic + "/cmnd/POWER" + chan, "", 0);
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

  return (
    <DashButton
      key={mqttTopic}
      onClick={() => {
        publish(mqttTopic + "/cmnd/POWER" + chan, active ? "OFF" : "ON", 0);
      }}
    >
      <IconContainer active={active}>{Icons.light}</IconContainer>
      <SwitchLabel>{label}</SwitchLabel>
      <StatusLabel>{devStatus}</StatusLabel>
    </DashButton>
  );
}
