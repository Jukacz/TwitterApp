import React, { useState } from "react";
import "./TweetForm.scss";

interface TweetFormProps {
  onTweetSubmit: (tweetText: string) => void;
  avatarUrl: string;
}

const TweetForm: React.FC<TweetFormProps> = ({ onTweetSubmit, avatarUrl }) => {
  const [tweetText, setTweetText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetText.trim() !== "") {
      onTweetSubmit(tweetText);
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
