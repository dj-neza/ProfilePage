import { Navigate } from "react-router-dom";
import { useAuthContext } from "../auth/auth-context";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import FirebaseAuth from "../components/firebase-auth";
import styled from "styled-components";
import { PageWrapper } from "../components/page-wrapper";
import { Heading } from "../components/heading";
import { firebaseUiOverrides } from "../styles/firebaseui-overrides";

const ContentWrapper = styled.div({
  width: 360,
  minHeight: 320,
  backgroundColor: "white",
  borderRadius: 16,
  border: "1px solid #E5E5E5",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  ...firebaseUiOverrides,
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
