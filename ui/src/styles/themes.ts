import { DefaultTheme } from "styled-components";

export const colorSetDefault = {
  white: "#ffffff",
  black: "#000000",
  grey: "#777"
};

export const colorSetLight = {
  primary: "#80deea",
  secondary: "#F3F5F7",
  background: "#ffffff"
} as const;

export const colorSetDark = {
  primary: "#313b50",
  secondary: "#313b50",
  background: "#1a2133"
} as const;

export const light: DefaultTheme = {
  themeName: "light",
  globalPage: {
    background: colorSetLight.background,
    color: colorSetDefault.black
  },
  button: {
    background: colorSetLight.secondary,
    color: colorSetDefault.black
  },
  primary: colorSetLight.primary,
  secondary: colorSetLight.secondary,
  shadowColor: colorSetDefault.grey,
  boxBackground: colorSetLight.secondary
} as const;

export const dark: DefaultTheme = {
  themeName: "dark",
  globalPage: {
    background: colorSetDark.background,
    color: colorSetDefault.white
  },
  button: {
    background: colorSetDark.primary,
    color: colorSetDefault.white
  },
  primary: colorSetDark.primary,
  secondary: colorSetDark.secondary,
  shadowColor: colorSetDefault.black,
  boxBackground: colorSetDark.secondary
} as const;

export const themeMap: {
  [s in DefaultTheme["themeName"]]: DefaultTheme;
} = {
  light: light,
  dark: dark
} as const;
