import styled from "styled-components";

export const Input = styled.input<{ $hasError?: boolean }>(
  ({ $hasError = false }) => ({
    width: "100%",
    boxSizing: "border-box",
    color: "#050A30",
    paddingLeft: 16,
    paddingRight: 24,
    border: "1px solid #ccc",
    ...($hasError && {
      borderColor: "#8B0000",
    }),
    borderRadius: 12,
    height: 48,
    fontSize: 16,
    "&:focus": {
      outline: "none",
      borderColor: "#050A30",
    },
  }),
);
