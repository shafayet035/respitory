import React from "react";
import { useUser } from "../../store";
import UserRoute from "../../component/UserRoute";

const Profile = () => {
  const user = useUser();

  return (
    <UserRoute>
      <h2>Profile</h2>
      <div>{user?.userName}</div>
    </UserRoute>
  );
};

export default Profile;
