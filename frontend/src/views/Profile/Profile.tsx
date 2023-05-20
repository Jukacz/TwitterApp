import { useParams } from "react-router-dom";
import "./Profile.scss";
import React, { useContext, useEffect, useState } from "react";
import requestToApi from "../../components/axios";
import UserContext from "../../contexts/user.context";
import { ProfileInterface } from "../../intefaces";
import { Skeleton } from "@chakra-ui/react";

const Profile: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileInterface>();
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);

  const isThisMyProfile = context?.user.username === name;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const profile_response = await requestToApi
        .get(`/profile/${name}`)
        .catch((err) => err.response);

      if (profile_response.data.success) {
        setProfile(profile_response.data.profile);
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);
  return (
    <div className="profile-container">
      <Skeleton isLoaded={!loading}>
        <div className="background-image">
          <img
            src="https://img.freepik.com/premium-photo/moscow-russia-december-9-2019-icons-twitter-social-network-simple-background-elegant-luxury-dynamic-style-business-corporate-social-template-3d-illustration_510351-6919.jpg"
            alt="Background"
          />
        </div>
      </Skeleton>
      <div className="profile-info">
        <Skeleton isLoaded={!loading}>
          <div className="profile-picture">
            <img src="https://picsum.photos/200" alt="Profile" />
          </div>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <div className="profile-username">
            <h1>{name}</h1>
          </div>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <div className="profile-name-and-surname">
            <h2>
              {profile?.first_name} {profile?.first_name}
            </h2>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Profile;
