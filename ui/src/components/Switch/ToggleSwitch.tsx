import { styled } from "@mui/material";
import { ChangeEvent } from "react";

const SwitchInput = styled("input")({
  height: "0",
  width: "0",
  visibility: "hidden"
})

const SwitchLabel = styled("label")({
  display: "flex"
})
  
  // align-items: center;
  // justify-content: space-between;
  // cursor: pointer;
  // width: 55px;
  // height: 32px;
  // border-radius: 100px;
  // border: 2px solid gray;
  // position: relative;
  // background-color: white;


const SwitchButton = styled("span")({
  content: "''",
  position: "absolute"
})
  
//   top: 2px;
//   left: 2px;
//   width: 28px;
//   height: 28px;
//   border-radius: 45px;

//   background: grey;
//   box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
//   ${SwitchInput}:checked + ${SwitchLabel} & {
//     left: calc(100% - 2px);
//     transform: translateX(-100%);
//   }

//   ${SwitchLabel}:active & {
//     width: 45px;
//   }
// `;

type Props = {
  id: string;
  checked: boolean;
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
};

const ToggleSwitch = ({ id, checked, onChange }: Props) => {
  return (
    <>
      <SwitchInput
        className="switch-checkbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <SwitchLabel className="switch-label" htmlFor={id}>
        <SwitchButton className="switch-button" />
      </SwitchLabel>
    </>
  );
};

export default ToggleSwitch;
