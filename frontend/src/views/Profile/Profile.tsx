import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import requestToApi from "../../components/axios";
import UserContext from "../../contexts/user.context";
import { ProfileInterface } from "../../intefaces";
import { Skeleton, Tooltip, useToast } from "@chakra-ui/react";
import { Post } from "../../components";
import ModalFollowers from "../../components/ModalFollowers/ModalFollowers";
import VerifyProfileContext from "../../contexts/verifyprofile.context";

const Profile: React.FC = () => {
  const { name } = useParams();
  const [profile, setProfile] = useState<ProfileInterface>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const secondContext = useContext(VerifyProfileContext);

  const { get_non_follower_users } = secondContext!;

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
  }, [name]);

  useEffect(() => {
    if (!profile) return;
  }, [profile]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const make_follow = async () => {
    if (profile?.following_already) {
      const response_from_sending_observation = await requestToApi
        .delete(`/relationship/`, {
          data: {
            follower: profile.id,
          },
        })
        .catch((err) => err.response);

      if (!response_from_sending_observation.data.success) {
        toast({
          title: "Błąd",
          description: "Podczas wysyłania obserwacji wystąpił błąd",
          status: "error",
        });
        return;
      }
      get_non_follower_users();
    } else {
      const response_from_sending_observation = await requestToApi
        .post(`/relationship/`, {
          follower: profile!.id,
        })
        .catch((err) => err.response);

      if (!response_from_sending_observation.data.success) {
        toast({
          title: "Błąd",
          description: "Podczas wysyłania obserwacji wystąpił błąd",
          status: "error",
        });
        return;
      }
      get_non_follower_users();
    }
    setProfile((state) => {
      return {
        ...state!,
        following_already: !state!.following_already,
        count_followers:
          state!.count_followers + (state!.following_already ? -1 : 1),
      };
    });
  };
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
              <Tooltip
                label={
                  profile?.following_already
                    ? "Kliknij, aby przestać obserwowanie tego użytkownika"
                    : "Kliknij, aby zaczać obserwować!"
                }
                hasArrow
                openDelay={250}
              >
                <button
                  onClick={() => make_follow()}
                  className={`follow-button ${
                    profile?.following_already
                      ? "folllowing_already"
                      : "following_not_yet"
                  }`}
                >
                  {profile?.following_already ? "Obserwujesz" : "Zaobserwuj"}
                </button>
              </Tooltip>
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
              <ModalFollowers username={name!} mode="followers">
                <Tooltip
                  label={`Kliknij, aby zobaczyc kto obserwuje ${name}`}
                  hasArrow
                >
                  <div className="profile-followers button-click">
                    <p>
                      {profile?.count_followers}
                      <span>Obserwujących</span>
                    </p>
                  </div>
                </Tooltip>
              </ModalFollowers>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <ModalFollowers username={name!} mode="following">
                <Tooltip
                  label={`Kliknij, aby zobaczyc kogo obserwuje ${name}`}
                  hasArrow
                >
                  <div className="profile-following">
                    <p>
                      {profile?.count_following}
                      <span>Obserwuje</span>
                    </p>
                  </div>
                </Tooltip>
              </ModalFollowers>
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
          {profile?.tweets.length === 0 ? (
            <h1 className="zero-tweets">
              {isThisMyProfile
                ? "Nic nie zapostowaleś"
                : "Ten użytkownik nie ma zadnych tweetów"}
            </h1>
          ) : (
            <>
              {profile?.tweets.map((tweet, index) => {
                return (
                  <Post
                    key={index}
                    tweet_id={tweet.id}
                    tweet_uuid={tweet.uuid}
                    content={tweet.content}
                    created_at={tweet.created_at}
                    author={{
                      first_name: tweet.first_name,
                      username: tweet.username,
                    }}
                    comment_numnber={tweet.comment_count}
                    likes_number={tweet.like_count}
                    updated_at={tweet.updated_at}
                    liked={tweet.already_liked}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
