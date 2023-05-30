import React, { useState } from "react";
import "./TweetForm.scss";
import requestToApi from "../axios";

const TweetForm: React.FC = () => {
  const [tweetText, setTweetText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 280) return;
    setTweetText(value);
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isHashtag = false;
    if (tweetText.trim() !== "") {
      const response_from_creating_tweet = await requestToApi.post("/create-tweet/", {
        content: tweetText,
      })

      console.log(response_from_creating_tweet)
      setTweetText("");
      const array_of_hashtags = [];
      const array_of_word = tweetText.split(" ");
      for (const word of array_of_word) {
        if (word.startsWith("#")) {
          isHashtag = true;
          array_of_hashtags.push(word);
          console.log("isHashtag", word);
        }
      }
      console.log("array_of_hashtags", array_of_hashtags);
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
