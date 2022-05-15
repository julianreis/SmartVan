import { atom, useAtom } from "jotai";

export const date = atom<{ getDate: () => Date; custom: boolean }>({
  getDate: () => new Date(),
  custom: false
});
