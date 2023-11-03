import { useState } from "react";
import { User, useAuthContext } from "../auth/auth-context";
import { updateUser } from "../requests/update-user";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import styled from "styled-components";
import { PageWrapper } from "../components/page-wrapper";
import { Paragraph } from "../components/paragraph";
import { Input } from "../components/input";

const ContentWrapper = styled.div({
  width: 360,
  height: 320,
  backgroundColor: "white",
  borderRadius: 16,
  border: "1px solid #E5E5E5",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 32,
  alignItems: "center",
});
const Row = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const Column = styled.div({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

export function Profile() {
  const { user, setUser, logOut } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    displayName: user?.displayName,
    email: user?.email,
  });

  const handleFormValueChange = (newFormValues: Partial<User>) => {
    setFormValues((prevValues) => ({ ...prevValues, ...newFormValues }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateUser({ phoneNumber: user?.phoneNumber!, ...formValues })
      .then(() => setUser({ phoneNumber: user?.phoneNumber!, ...formValues }))
      .finally(() => setIsEditing(false));
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Row>
          <Heading>{`Hi, ${user?.displayName}`}</Heading>
          {!isEditing && (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </Row>
        {isEditing ? (
          <form onSubmit={handleSubmit} name="form" style={{ width: "100%" }}>
            <Column>
              <Input
                value={formValues.displayName}
                placeholder="Name"
                onChange={(e) =>
                  handleFormValueChange({ displayName: e.target.value })
                }
              />
              <Input
                value={formValues.email}
                placeholder="Email"
                onChange={(e) =>
                  handleFormValueChange({ email: e.target.value })
                }
              />
              <Button size="sm" type="submit">
                Save
              </Button>
              <Button
                size="sm"
                type="button"
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Column>
          </form>
        ) : (
          <Column>
            <div>
              <Paragraph>{`You have logged in using this information:`}</Paragraph>
              <Paragraph>{user?.phoneNumber}</Paragraph>
              <Paragraph>{user?.email ?? "No email yet :("}</Paragraph>
            </div>
            <Button size="sm" variant="outlined" onClick={logOut}>
              Log out
            </Button>
          </Column>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
}
