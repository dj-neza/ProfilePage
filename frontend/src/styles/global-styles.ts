import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle({
  body: {
    backgroundColor: '#FAF9FB',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Verdana, sans-serif',
    margin: 0
  },
  '#root': {
    height: '100%',
  },
})