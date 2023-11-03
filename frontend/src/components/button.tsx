import styled from "styled-components";

export const Button = styled.button<{
  size?: "sm" | "md";
  variant?: "filled" | "outlined";
}>(({ size = "md", variant = "filled" }) => ({
  font: "inherit",
  color: "white",
  backgroundColor: "#0E86D4",
  borderColor: "#0E86D4",
  "&:hover": {
    background: "#003060",
    borderColor: "#003060",
  },
  ...(variant === "outlined" && {
    color: "#0E86D4",
    backgroundColor: "white",
    borderColor: "#0E86D4",
    "&:hover": {
      color: "white",
      backgroundColor: "#0E86D4",
      borderColor: "#0E86D4",
    },
  }),
  cursor: "pointer",
  textDecoration: "none",
  display: "block",
  border: "1px solid",
  borderRadius: 9999,
  textAlign: "center",
  whiteSpace: "nowrap",
  paddingBlock: 8,
  paddingInline: 24,
  "&:disabled": {
    cursor: "not-allowed",
    background: "#D3D3D3",
    borderColor: "#D3D3D3",
  },
  fontSize: 24,
  lineHeight: "32px",
  ...(size === "sm" && {
    fontSize: 16,
    lineHeight: "20px",
  }),
}));
