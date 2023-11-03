import styled from "styled-components";

export const Button = styled.button<{
  size?: "sm" | "md";
  variant?: "primary" | "secondary";
}>(({ size = "md", variant = "filled" }) => ({
  font: "inherit",
  color: "white",
  border: "1px solid",
  backgroundColor: "#055C9D",
  borderColor: "#055C9D",
  "&:hover": {
    outline: "none",
    background: "#003060",
    borderColor: "#003060",
  },
  ...(variant === "secondary" && {
    backgroundColor: "#003060",
    borderColor: "#003060",
    "&:hover": {
      backgroundColor: "#050A30",
      borderColor: "#050A30",
    },
  }),
  cursor: "pointer",
  textDecoration: "none",
  display: "block",
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
