import "./VerifyProfile.scss";
import React, { useContext } from "react";
import UserContext from "../../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";
import { RightSidebar, Sidebar } from "../../components";

const VerifyProfile: React.FC = () => {
  const context = useContext(UserContext)!;

  if (!context.user.isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="verify-profile-container">
        <Sidebar />
        <div className="outlet">
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </>
  );
};

export default VerifyProfile;
