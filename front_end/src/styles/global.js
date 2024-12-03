import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(180deg, #f3f9f4, #e9f5f2);
    color: #333;
    line-height: 1.6;
  }
  * {
    box-sizing: border-box;
  }
`;


export default GlobalStyle;