import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import requestToApi from "../../components/axios";
import UserContext from "../../contexts/user.context";
import { ProfileInterface } from "../../intefaces";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Post } from "../../components";

const Profile: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileInterface>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const isThisMyProfile = context?.user.username === name;
  const toast = useToast();

  useEffect(() => {
    document.title = `Twitter | Profil ${name}`;
    const init = async () => {
      setLoading(true);
      const profile_response = await requestToApi
        .get(`/profile/${name}`)
        .catch((err) => err.response);

      if (profile_response.data.success) {
        setLoading(false);
        setProfile(profile_response.data.profile);
        return;
      }
      toast({
        title: "Błąd",
        description:
          profile_response.status === 404
            ? "Nie znaleziono użytkownika"
            : "Wystąpił błąd",
        status: "error",
      });
      navigate("/");
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
          <div className="profile-picture-container">
            <div>
              <img src="https://picsum.photos/200" alt="Profile" />
            </div>
            {!isThisMyProfile && (
              <button className="follow-button">
                {profile?.following_already ? "Obserwujesz" : "Zaobserwuj"}
              </button>
            )}
          </div>
        </Skeleton>
        <div className="profile-text">
          <Skeleton isLoaded={!loading}>
            <div className="profile-username">
              <h1>{name}</h1>
            </div>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <div className="profile-name-and-surname">
              <h2>
                {profile?.first_name} {profile?.last_name}
              </h2>
            </div>
          </Skeleton>
          <div className="flex-box-div">
            <Skeleton isLoaded={!loading}>
              <div className="profile-followers">
                <p>
                  {profile?.count_followers}
                  <span>Obserwujących</span>
                </p>
              </div>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <div className="profile-following">
                <p>
                  {profile?.count_following}
                  <span>Obserwuje</span>
                </p>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
      <div className="profile-posts">
        <div className="profile-posts-header">
          <h2>
            {!isThisMyProfile ? `Posty użytkownika ${name}` : "Moje posty"}
          </h2>
        </div>
        <div className="profile-posts-container">
          {profile?.tweets.map((tweet, index) => {
            return (
              <Post
                key={index}
                tweet_id={tweet.id}
                content={tweet.content}
                created_at={tweet.created_at}
                author={{
                  first_name: tweet.first_name,
                  username: tweet.username,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
