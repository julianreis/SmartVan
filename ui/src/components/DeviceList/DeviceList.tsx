import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import Modal from 'react-modal';
import { useEffect } from "react";

const FormBox = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: ${p => p.theme.boxBackground};
  box-shadow: 5px 10px 6px -6px ${p => p.theme.shadowColor};
  padding: 20px;
  max-width: 80vw;
  margin: 20px 0;
  color: ${p => p.theme.globalPage.color};
`;

const Headline = styled.h1`
  padding: 0px;
  margin: 0px;
`;

const List = styled.div`
  padding: 10px 0;
  > li {
    margin: 5px 0;
  }
`;

export type Device = {
  id: number
  name: string
}

export type DeviceDetail = {
  id: number
  lastupdate: string
  name: string
  state: string
  type: string
}

export default function DeviceList() {

  const url = "http://localhost:8081/api/devices"
  const deviceDetailUrl = "http://localhost:8081/api/device/"
  const [devices, setDevices] = useState<Array<Device>>([])
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDeviceID, setSelectedDeviceID] = React.useState<number>();
  const [deviceDetail, setDeviceDetail] = React.useState<DeviceDetail>();

  useEffect(() => {
    if (!selectedDeviceID) return
    fetch(deviceDetailUrl + selectedDeviceID)
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result.data);
        const test: DeviceDetail = result.data;
        setDeviceDetail(test)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [selectedDeviceID])

  const subAll = () => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result.data);
        setDevices(result.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const onDeviceClick = (id: number) => {
    setIsOpen(true);
    setSelectedDeviceID(id)
  }

  function closeModal() {
    setIsOpen(false);
  }

  const parseDate = (date?: string) => {
    if (date) {
      console.log(date)
      let parsed = new Date();
      parsed.setTime(Number.parseInt(date))
      return parsed.toLocaleString()
    }
    return ""
  }


  return (
    <FormBox id={"test"}>
      <Headline>New - Devices</Headline>
      {devices && (
        <List>
          {devices.map((e, i) => (
            <li key={i} onClick={() => onDeviceClick(e.id)}>{e.id} - {e.name}</li>
          ))}
        </List>
      )}
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div>
          <h1>{deviceDetail?.name}</h1>
          <div>msg: {deviceDetail?.name}</div>
          <div>state: {deviceDetail?.state}</div>
          <div>type: {deviceDetail?.type}</div>
          <div>last Update: {parseDate(deviceDetail?.lastupdate)}</div>

          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
      <Button variant="contained" color="primary" onClick={subAll}>
        Refresh
      </Button>
    </FormBox>
  );
}
