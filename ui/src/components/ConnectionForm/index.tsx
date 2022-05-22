import { styled, TextField, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { ConnectionStatus, useMqttContext } from "../../context/MqttContext";

const InputWrapper = styled("div")({
  display: "block"
})

const FormBox = styled("div")({
  width: "100%"
  // width: "100%",
  // borderRadius: "5px",
  // padding: "20px",
  // max-width: 80vw;
  // margin: 20px 0;
  // color: ${p => p.theme.globalPage.color};
})

const ButtonContainer = styled("div")({
  padding: "10px 0"
  // color: ${p => p.theme.globalPage.color};
  // padding: 10px 0;
})

const Status = styled("div")({
  padding: "10px 0"
})

export default function ConnectionForm() {
  const {
    connect,
    isSubed,
    client,
    disconnect,
    subscribe,

    connectStatus,
    unSubscribe,
    lastHost
  } = useMqttContext();

  const [ip, setIp] = useState<string>(lastHost ? lastHost : "");
  const [port, setPort] = useState<string>("9001");
  const topic = useRef<string>("");

  const onSubscribe = () => {
    subscribe(topic.current);
  };

  const changeIP = (event: any) => {
    setIp(event.target.value);
  };
  const changePort = (event: any) => {
    setPort(event.target.value);
  };
  const changeTopic = (event: any) => {
    topic.current = event.target.value;
  };

  return (
    <>
      <FormBox>
        <h1>Broker</h1>
        <InputWrapper>
          <TextField
            onChange={changeIP}
            value={ip}
            id="ip"
            label="IP"
            variant="outlined"
            disabled={client ? true : false}
          />
          <TextField
            onChange={changePort}
            value={port}
            id="port"
            label="Port"
            variant="outlined"
            disabled={client ? true : false}
          />
        </InputWrapper>

        <Status>
          Status: {connectStatus}{" "}
          {connectStatus === ConnectionStatus.Connectet ? "to " + ip : ""}
        </Status>
        <ButtonContainer>
          {client ? (
            <Button variant="contained" color="secondary" onClick={disconnect}>
              Disconnect
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => connect(ip, port)}
            >
              Save & Connect
            </Button>
          )}
        </ButtonContainer>
      </FormBox>
      <FormBox>
        <h1>Manuell Subscribe</h1>

        <TextField
          onChange={changeTopic}
          id="topic"
          label="Topic"
          variant="filled"
          disabled={isSubed}
        />

        <h4>aktiv: {isSubed ? "Ja" : "Nein"}</h4>
        {isSubed ? (
          <Button
            onClick={() => unSubscribe(topic.current)}
            variant="contained"
            color="secondary"
          >
            Unsubscribe
          </Button>
        ) : (
          <Button onClick={onSubscribe} variant="contained">
            Subscribe
          </Button>
        )}
      </FormBox>
    </>
  );
}
