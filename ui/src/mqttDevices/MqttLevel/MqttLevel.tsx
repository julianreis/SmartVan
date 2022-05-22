import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
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

export default function MqttLevel({ mqttTopic, name }: Props) {
  const [value, setValue] = useState<number>(0);
  const [devStatus, setDevStatus] = useState<string>("");
  const { client, subscribe, unSubscribe } = useMqttContext();
  const { theme } = useSettingsContext();

  const water = buildStyles({
    rotation: 0,
    strokeLinecap: "butt",
    textSize: "16px",
    pathTransitionDuration: 0.8,
    pathColor: "#6bccfa",
    textColor: "#6bccfa",
    trailColor: "#386693",
  });

  const handleIncommingMSG = (topic: string, msg: Buffer) => {
    const message = msg.toString();
    console.log("🔦", topic, " - ", message);

    const ohm = parseFloat(message);
    if (ohm > 1000) {
      setValue(0);
      return;
    }
    if (ohm > 690 && ohm < 653) {
      setValue(15);
      return;
    }
    if (ohm > 603 && ohm < 653) {
      setValue(30);
      return;
    }
    if (ohm > 537 && ohm < 587) {
      setValue(45);
      return;
    }
    if (ohm > 484 && ohm < 534) {
      setValue(60);
      return;
    }
    if (ohm > 441 && ohm < 491) {
      setValue(75);
      return;
    }
    if (ohm > 385 && ohm < 435) {
      setValue(90);
      return;
    }
    if (ohm > 342) {
      setValue(100);
      return;
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
      <CircularProgressbar value={value} text={`${value}%`} styles={water} />
    </DashButton>
  );
}
