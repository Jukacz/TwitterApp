import "./Dashboard.scss";
import React, { useEffect, useState } from "react";
import { Post, TweetForm } from "../../components";
import requestToApi from "../../components/axios";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Tweet } from "../../intefaces";

const Dashboard: React.FC = () => {
  const [myTweets, setMyTweets] = useState<Tweet[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const getMyFollowedTweets = async () => {
    setLoading(true);
    const response = await requestToApi
      .get("/home/following/")
      .catch((err) => err.response);

    if (response.data.success) {
      setMyTweets(response.data.tweets);
      setLoading(false);
      return;
    }
    toast({
      title: "Nie udało sie pobrać tweetów",
      description: "Spróbuj ponownie później",
    });
  };

  const getAllTweets = async () => {
    setLoading(true);
    const response = await requestToApi
      .get("/home/tweets/")
      .catch((err) => err.response);

    if (response.data.success) {
      setTweets(response.data.tweets);
      setLoading(false);
      return;
    }
    toast({
      title: "Nie udało sie pobrać tweetów",
      description: "Spróbuj ponownie później",
      status: "error",
    });
  };

  useEffect(() => {
    document.title = "Twitter | Strona Główna";
    getMyFollowedTweets();
    getAllTweets();
  }, []);

  const handleTweetSubmit = (tweetText: string) => {
    if (tweetText.length > 1) {
      if (tweetText.includes("#")) {
        console.log("tweetText", tweetText);
        return;
      }
      toast({
        title: "Tweet musi zawierać co najmiej jeden hasztag",
        status: "warning",
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <TweetForm />
        <Skeleton isLoaded={!loading}>
          <div className="tweets">
            {myTweets.length > 0 && (
              <>
                <h2>Najnowsze Posty od Twoich Znajomych</h2>
                {myTweets.map((tweet, index) => (
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
                ))}
              </>
            )}
            {tweets.length > 0 && (
              <>
                <h2>Wszystkie Tweety</h2>
                {tweets.map((tweet, index) => {
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
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;
