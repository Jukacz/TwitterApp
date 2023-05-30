import React, { useState } from "react";
import "./TweetForm.scss";
import requestToApi from "../axios";

interface TweetFormProps {
  onTweetSubmit: (tweetText: string) => void;
  avatarUrl: string;
}

const TweetForm: React.FC<TweetFormProps> = ({ onTweetSubmit, avatarUrl }) => {
  const [tweetText, setTweetText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 280) return;
    setTweetText(value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetText.trim() !== "") {
      const response_from_creating_tweet = await requestToApi.post("/create-tweet/", {
        content: tweetText,
      })

      console.log(response_from_creating_tweet)
      setTweetText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <div className="tweet-header">
        <div className="avatar-container">
          <img src={avatarUrl} alt="User avatar" className="avatar" />
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
    </form>
  );
};

export default TweetForm;
