import { useAuthContext } from "../auth/auth-context";

export function Profile() {
  const { user, logOut } = useAuthContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h3>{user?.displayName ?? "No name"}</h3>
      <p>{user?.email ?? "No email"}</p>
      <p>{user?.phoneNumber ?? "No phone"}</p>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}
