import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/auth-context";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import FirebaseAuth from "../components/firebase-auth";
import styled from "styled-components";
import { PageWrapper } from "../components/page-wrapper";
import { Heading } from "../components/heading";

const ContentWrapper = styled.div({
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
    borderRadius: 16,
    marginTop: "unset",
  },
});
export function SignIn() {
  const { firebaseAuth, firebaseUiConfig } = useAuthContext();
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Heading>Sign in</Heading>
        <FirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebaseAuth} />
      </ContentWrapper>
    </PageWrapper>
  );
}
