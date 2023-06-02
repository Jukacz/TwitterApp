import "./VerifyProfile.scss";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/user.context";
import { Navigate, Outlet } from "react-router-dom";
import { RightSidebar, Sidebar } from "../../components";
import VerifyProfileContext from "../../contexts/verifyprofile.context";
import requestToApi from "../../components/axios";
import { useToast } from "@chakra-ui/react";

const VerifyProfile: React.FC = () => {
  const context = useContext(UserContext)!;

  const toast = useToast();

  const [lastHashtags, setlastHashtags] = useState<string[]>([]);
  const [nonFollowedUsers, setNonFollowedUsers] = useState<string[]>([]);

  if (!context.user.isLogged) {
    return <Navigate to="/login" />;
  }

  const get_non_follow_users = async () => {
    const response_from_users = await requestToApi
      .get("me/iDontFollow/")
      .catch((err) => err.response);

    if (response_from_users.data.success) {
      setNonFollowedUsers(response_from_users.data.users);
      return;
    }
    toast({
      title: "Błąd",
      description: "Nie udało się pobrać użytkowników",
      status: "error",
    });
  };

  const getLastHashtags = async () => {
    const response = await requestToApi
      .get("last-hashtags/")
      .catch((err) => err.response);

    if (response.data.success) {
      setlastHashtags(response.data.hashtags);
      return;
    }
    toast({
      title: "Nie udało sie pobrać hashtagów",
      description: "Spróbuj ponownie później",
    });
  };

  return (
    <>
      <div className="verify-profile-container">
        <VerifyProfileContext.Provider
          value={{
            get_non_follower_users: get_non_follow_users,
            getLastHashtags: getLastHashtags,
          }}
        >
          <Sidebar />
          <div className="outlet">
            <Outlet />
          </div>
          <RightSidebar
            lastHashtags={lastHashtags}
            nonFollowerUsers={nonFollowedUsers}
          />
        </VerifyProfileContext.Provider>
      </div>
    </>
  );
};

export default VerifyProfile;
