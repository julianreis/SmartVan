import React, { ChangeEvent } from "react";
import ToggleSwitch from "../Switch/ToggleSwitch";

type Props = {
  id: string;
  checked: boolean;
  onChange?: (val: ChangeEvent<HTMLInputElement>) => void;
};

export default function DarkmodeSwitch({ id, checked, onChange }: Props) {
  return <ToggleSwitch id={id} checked={checked} onChange={onChange} />;
}
