import styled from "styled-components";

export const ContentWrapper = styled.div({
  boxSizing: "border-box",
  width: "100%",
  height: "90%",
  marginTop: "20%",
  backgroundColor: "white",
  border: "1px solid #E5E5E5",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media(min-width: 480px)": {
    width: 360,
    minHeight: "50%",
    height: "unset",
    borderRadius: 16,
    marginTop: "unset",
  },
});
