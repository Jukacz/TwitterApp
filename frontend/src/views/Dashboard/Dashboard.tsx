import "./Dashboard.scss";
import React, { useEffect, useState } from "react";
import { Post, TweetForm } from "../../components";
import requestToApi from "../../components/axios";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Tweet } from "../../intefaces";

const Dashboard: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toast = useToast({ duration: 3000, isClosable: true });
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
        <TweetForm
          onTweetSubmit={handleTweetSubmit}
          avatarUrl="https://media.gettyimages.com/id/1322571825/photo/robert-lewandowski-of-poland-poses-during-the-official-uefa-euro-2020-media-access-day-on.jpg?s=612x612&w=gi&k=20&c=uQjS0WUHg9EY-t3ghuvm_n_oJUiyDFPaE6IBC1IRRvo="
        />
        <Skeleton isLoaded={!loading}>
          <div className="tweets">
            <h2>Najnowsze Posty</h2>
            {tweets.map((tweet, index) => (
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
            ))}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;
