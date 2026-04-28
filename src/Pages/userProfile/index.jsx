import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";

export function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>elle {user} its er prefel</div>;
      <div>
        <button>Posts</button>
        <button>Comments</button>
      </div>
    </>
  );
}
export default UserProfile;
