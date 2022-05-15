import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { DashButton } from "../../components/dashContainer";
import { useMqttContext } from "../../context/MqttContext";
import { useSettingsContext } from "../../context/SettingContext";

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

const LevelContainer = styled.div`
  height: 180px;
  width: 50px;
  display: flex;
  flex-direction: column-reverse;
  border-radius: 10px;
  background-color: #777;
`;

const Level = styled.div<{ level: number }>`
  bottom: 0;
  left: 0;
  background-color: #c4c10d;
  border-radius: 10px;
  height: ${p => (p.level > 10 ? p.level : 10)}%;

  > div {
    font-size: 15px;
    font-weight: bold;
    margin-top: ${p => (p.level > 13 ? 10 : 0)}px;
  }
`;

export default function MqttWeight({ mqttTopic, name }: Props) {
  const [value, setValue] = useState<number>(0);
  const [devStatus, setDevStatus] = useState<string>("");
  const { client, subscribe, unSubscribe } = useMqttContext();

  const handleIncommingMSG = (topic: string, msg: Buffer) => {
    const message = msg.toString();
    const msgTyp = topic.replace(mqttTopic, "");

    console.log("🔦", topic, " - ", message);

    try {
      const weight = parseFloat(message);
      setValue(weight * 10);
    } catch (error) {
      console.log("ParseError");
    }
  };

  useEffect(() => {
    const topic = mqttTopic;
    if (client) {
      console.log("subscribe to ", topic);
      subscribe(topic);
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
    <DashButton>
      <span>{name}</span>
      <LevelContainer>
        <Level level={value}>
          <div>{value}%</div>
        </Level>
      </LevelContainer>
    </DashButton>
  );
}
