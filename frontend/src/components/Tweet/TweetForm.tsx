import React, { useState } from "react";
import "./TweetForm.scss";
import requestToApi from "../axios";
import { useToast } from "@chakra-ui/react";

const TweetForm: React.FC = () => {
  const [tweetText, setTweetText] = useState("");
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 280) return;
    setTweetText(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isHashtag = false;
    if (tweetText.trim() !== "") {
      const array_of_hashtags = [];
      const array_of_word = tweetText.split(" ");
      for (const word of array_of_word) {
        if (word.startsWith("#")) {
          isHashtag = true;
          array_of_hashtags.push(word);
          console.log("isHashtag", word);
        }
      }

      if (!isHashtag) {
        toast({
          title: "Tweet musi zawierać hashtag",
          status: "warning",
        });
        return;
      }
      const response_from_creating_tweet = await requestToApi
        .post("/create-tweet/", {
          content: tweetText,
        })
        .catch((err) => err.response);

      if (response_from_creating_tweet.data.success) {
        toast({
          title: "Tweet został utworzony",
          status: "success",
        });
        return;
      }
      toast({
        title: "Tweet nie został utworzony",
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <div className="tweet-header">
        <div className="avatar-container">
          <img
            src="https://picsum.photos/200"
            alt="User avatar"
            className="avatar"
          />
        </div>
        <textarea
          className="tweet-input"
          placeholder="What's happening?"
          value={tweetText}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-bottom">
        <button type="submit" className="tweet-button">
          Tweet
        </button>
        <span className="character-count">{280 - tweetText.length}</span>
      </div>
      {/* <div className="formatted-tweet-text">
        <span
          dangerouslySetInnerHTML={{ __html: formatTweetText(tweetText) }}
        />
      </div> */}
    </form>
  );
};

export default TweetForm;
