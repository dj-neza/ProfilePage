import { useState } from "react";
import { User, useAuthContext } from "../auth/auth-context";
import { updateUser } from "../requests/update-user";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import styled from "styled-components";
import { PageWrapper } from "../components/page-wrapper";
import { ErrorMessage, Paragraph } from "../components/paragraph";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";

const ContentWrapper = styled.div({
  width: 360,
  minHeight: 320,
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
  width: "100%",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
});

const InputWrapper = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export function Profile() {
  const { user, setUser, logOut } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<User>({ defaultValues: user ?? undefined, mode: "onChange" });

  const onSubmit = async (formValues: User) => {
    await updateUser({ ...formValues, phoneNumber: user?.phoneNumber! })
      .then(() => setUser(formValues))
      .finally(() => setIsEditing(false));
  };
  const handleStopEditing = () => {
    setIsEditing(false);
    reset(user ?? undefined);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            name="form"
            style={{ width: "100%" }}
          >
            <Column>
              <InputWrapper>
                <Input
                  placeholder="Name"
                  {...register("displayName", {
                    required: "Name is mandatory",
                  })}
                  hasError={Boolean(errors.displayName)}
                />
                {errors.displayName?.message && (
                  <ErrorMessage>{errors.displayName?.message}</ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is mandatory",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  hasError={Boolean(errors.email)}
                />
                {errors.email?.message && (
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>
                )}
              </InputWrapper>
              <Button size="sm" type="submit" disabled={!isValid}>
                Save
              </Button>
              <Button
                size="sm"
                type="button"
                variant="secondary"
                onClick={handleStopEditing}
              >
                Cancel
              </Button>
            </Column>
          </form>
        ) : (
          <>
            <Column>
              <Paragraph>{`You have logged in using this information:`}</Paragraph>
              <Paragraph>{user?.phoneNumber}</Paragraph>
              <Paragraph>{user?.email ?? "No email yet :("}</Paragraph>
            </Column>
            <Button size="sm" variant="secondary" onClick={logOut}>
              Log out
            </Button>
          </>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
}
