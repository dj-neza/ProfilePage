import { useState } from "react";
import { useAuthContext } from "../auth/auth-context";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import styled from "styled-components";
import { PageWrapper } from "../components/page-wrapper";
import { Paragraph } from "../components/paragraph";
import { Loader } from "../components/loader";
import { ContentWrapper } from "../components/content-wrapper";
import { ProfileForm } from "../components/profile-form";

export const Column = styled.div({
  width: "100%",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export function Profile() {
  const {
    user,
    logOut,
    generatedName,
    isLoading: isAuthLoading,
  } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading || isAuthLoading) {
    return (
      <PageWrapper>
        <ContentWrapper $verticallyCenter>
          <Loader />
        </ContentWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {isEditing ? (
        <ContentWrapper>
          <Heading>{`Edit profile`}</Heading>
          <ProfileForm
            setIsEditing={setIsEditing}
            setIsLoading={setIsLoading}
          />
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <Heading>{`Hello ${user?.name || generatedName}`}</Heading>
          <Column>
            <Paragraph>{`This is your information:`}</Paragraph>
            <Paragraph>{user?.phoneNumber}</Paragraph>
            <Paragraph>
              {Boolean(user?.email) ? user?.email : "No email yet :("}
            </Paragraph>
            <Button $size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Column>
          <Button $size="sm" $variant="secondary" onClick={logOut}>
            Log out
          </Button>
        </ContentWrapper>
      )}
    </PageWrapper>
  );
}
