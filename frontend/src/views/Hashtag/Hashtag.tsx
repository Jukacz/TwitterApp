import "./Hashtag.scss";
import React, { useEffect, useState } from "react";
import { Post, TweetForm } from "../../components";
import requestToApi from "../../components/axios";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Tweet } from "../../intefaces";
import { useParams } from "react-router-dom";

const Hashtag: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toast = useToast();
  const { hashtagName } = useParams();
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

  return (
    <div className="dashboard-container">
      <div>
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

export default Hashtag;
