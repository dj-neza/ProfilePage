import styled from "styled-components";

export const Paragraph = styled.p({
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "24px",
  color: "#050A30",
  whiteSpace: "pre-wrap",
  margin: 0,
});

export const ErrorMessage = styled(Paragraph)({
  fontSize: 14,
  lineHeight: "18px",
  color: "#8B0000",
});
