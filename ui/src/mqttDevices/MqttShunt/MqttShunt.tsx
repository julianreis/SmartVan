import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { DashButton } from "../../components/dashContainer";
import { useMqttContext } from "../../context/MqttContext";

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

export default function MqttShunt({ mqttTopic, name }: Props) {
  const [value, setValue] = useState<number>(0);
  const [devStatus, setDevStatus] = useState<string>("");
  const { client, subscribe, unSubscribe } = useMqttContext();

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
      default:
        break;
    }
  };

  useEffect(() => {
    const topic = mqttTopic + "/#";
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
    </DashButton>
  );
}
