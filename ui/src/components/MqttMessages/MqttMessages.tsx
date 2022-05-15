import styled from "styled-components";
import { useMqttContext } from "../../context/MqttContext";

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

export default function MqttMessages() {
  const { payload } = useMqttContext();

  return (
    <FormBox>
      <h1>Eingehende Nachrichten</h1>

      <span>{payload?.time} </span>
      <span>{payload?.message}</span>
    </FormBox>
  );
}
