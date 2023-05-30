import "./Dashboard.scss";
import React, { useEffect, useState } from "react";
import { Post, TweetForm } from "../../components";
import requestToApi from "../../components/axios";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Tweet } from "../../intefaces";

const Dashboard: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPosts = async () => {
    setLoading(true);
    const response = await requestToApi
      .get("/home/following/")
      .catch((err) => err.response);

    if (response.data.success) {
      setTweets(response.data.tweets);
      setLoading(false);
      return;
    }
    toast({
      title: "Nie udało sie pobrać tweetów",
      description: "Spróbuj ponownie później",
    });
  };

  useEffect(() => {
    document.title = "Twitter | Strona Główna";
    getAllPosts();
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
            <h2>Najnowsze Posty</h2>
            {tweets.map((tweet, index) => (
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
              />
            ))}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;
