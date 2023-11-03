import { useState } from "react";
import { User, useAuthContext } from "../auth/auth-context";
import { updateUser } from "../requests/update-user";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h3>Your profile</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit} name="form">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <input
              value={formValues.displayName}
              placeholder="Name"
              onChange={(e) =>
                handleFormValueChange({ displayName: e.target.value })
              }
            />
            <input
              value={formValues.email}
              placeholder="Email"
              onChange={(e) => handleFormValueChange({ email: e.target.value })}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <p>{user?.displayName ?? "No name"}</p>
          <p>{user?.email ?? "No email"}</p>
          <p>{user?.phoneNumber ?? "No phone"}</p>
          <button onClick={logOut}>Log out</button>
        </>
      )}
    </div>
  );
}
