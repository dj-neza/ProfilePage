import styled from "styled-components";
import { Column } from "../pages/profile";
import { ErrorMessage } from "./paragraph";
import { Input } from "./input";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { User, useAuthContext } from "../auth/auth-context";
import { updateUser } from "../requests/update-user";
import { useNotificationContext } from "../contexts/notification-context";

const Form = styled.form({
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

type ProfileFormProps = {
  setIsEditing: (isEditing: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
};
export function ProfileForm({ setIsEditing, setIsLoading }: ProfileFormProps) {
  const { user, setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<User>({ defaultValues: user ?? undefined, mode: "onChange" });
  const { addNotification } = useNotificationContext();

  const handleStopEditing = () => {
    setIsEditing(false);
    reset(user ?? undefined);
  };
  const onSubmit = async (formValues: User) => {
    setIsLoading(true);
    await updateUser({ ...formValues, phoneNumber: user?.phoneNumber! })
      .then(() => {
        setUser({ ...formValues, phoneNumber: user?.phoneNumber! });
        setIsEditing(false);
      })
      .catch(({ response }) => {
        addNotification({
          message: response.data.error ?? "Something unexpected happened.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      name="form"
      style={{ width: "100%" }}
    >
      <Column>
        <InputWrapper>
          <Input
            placeholder="Name"
            {...register("name", {
              required: "Name is mandatory",
            })}
            $hasError={Boolean(errors.name)}
          />
          {errors.name?.message && (
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
            $hasError={Boolean(errors.email)}
          />
          {errors.email?.message && (
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          )}
        </InputWrapper>
      </Column>
      <Button $size="sm" type="submit" disabled={!isValid}>
        Save
      </Button>
      <Button
        $size="sm"
        type="button"
        $variant="secondary"
        onClick={handleStopEditing}
      >
        Cancel
      </Button>
    </Form>
  );
}
