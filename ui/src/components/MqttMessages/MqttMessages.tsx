import { styled } from "@mui/material";
import { useMqttContext } from "../../context/MqttContext";

const FormBox = styled("div")({
  width: "100%",
  borderRadius: "5px",
  padding: "20px",
  maxWidth: "80vw",
  margin: "20px 0"
})

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
