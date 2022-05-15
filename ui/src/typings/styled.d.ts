import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    themeName: "light" | "dark";
    globalPage: {
      background: string;
      color: string;
    };
    button: {
      background: string;
      color: string;
    };
    shadowColor: string;
    primary: string;
    secondary: string;
    boxBackground: string;
  }
}
