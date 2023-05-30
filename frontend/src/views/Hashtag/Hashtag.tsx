import "./Hashtag.scss";
import React, { useEffect, useState } from "react";
import { Post, TweetForm } from "../../components";
import requestToApi from "../../components/axios";
import { Skeleton, useToast } from "@chakra-ui/react";
import { Tweet } from "../../intefaces";
import { useNavigate, useParams } from "react-router-dom";

const Hashtag: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { name } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPosts = async () => {
    setLoading(true);
    const response = await requestToApi
      .get(`/hashtag/${name}`)
      .catch((err) => err.response);

    if (response.data.success) {
      setTweets(response.data.tweets);
      setLoading(false);
      return;
    }
    toast({
      title: "Nie ma takiego hasztagu",
      description: "Spróbuj ponownie później",
    });
    navigate("/");
  };

  useEffect(() => {
    document.title = `Twitter | Hashtag ${name} `;
    getAllPosts();
  }, [name]);

  return (
    <div className="dashboard-container">
      <div>
        <Skeleton isLoaded={!loading}>
          <div className="tweets">
            <h2>Tweety z hasztagiem {name}</h2>
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
                liked={tweet.already_liked}
              />
            ))}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default Hashtag;
