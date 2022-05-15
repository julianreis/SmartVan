import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html{
    min-height: 100%;
    font-size: 16px;
  }
  body {

    height: 100vh;
    margin: 0;
    padding: 0;
    min-height: 100%;
    overscroll-behavior-y: none;
    text-rendering: optimizeSpeed;
    -webkit-text-size-adjust: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Helvetica Neue";
    background: ${p => p.theme.globalPage.background};
    color: ${p => p.theme.globalPage.color};

    overflow-x: hidden;
    display: flex;

    > * {
      width: 100%;
      min-height: 100%;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button{
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    appearance: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  a {
    color: inherit;
    font: inherit;
    text-decoration: none;

    &:hover, &:visited, &:active{
      text-decoration: none;
      color: inherit;
    }
  }

  h1, h2, h3, h4, h5, h6{
    font: inherit;
    margin: 0;
    padding: 0;
  }
  *:focus{
    outline: none;
  }

`;
