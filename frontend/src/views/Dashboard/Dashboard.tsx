import "./Dashboard.scss";
import React from "react";
import { Sidebar, Post, RightSidebar, TweetForm } from "../../components";
import { PostProps } from "../../components/Post/Post";
import axios from "axios";
import requestToApi from "../../components/axios";

const Dashboard: React.FC = () => {
  const [tweets, setTweets] = React.useState<any[]>([]);

  React.useEffect(() => {
    requestToApi
      .get("/home/following/")
      .then((response) => {
        console.log(response.data);
        setTweets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const hashtags = ["react", "typescript", "javascript"];
  const nonFollowedUsers = [
    "@ogrodas",
    "@pingwinek2115",
    "@frontendnawypasie.com",
    "@reactjs",
  ];

  const handleTweetSubmit = (tweetText: string) => {
    // do something with the tweet text
    console.log(tweetText);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div>
        <TweetForm
          onTweetSubmit={handleTweetSubmit}
          avatarUrl="https://media.gettyimages.com/id/1322571825/photo/robert-lewandowski-of-poland-poses-during-the-official-uefa-euro-2020-media-access-day-on.jpg?s=612x612&w=gi&k=20&c=uQjS0WUHg9EY-t3ghuvm_n_oJUiyDFPaE6IBC1IRRvo="
        />
        {Array.isArray(tweets) &&
          tweets.map((tweet: any) => (
            <Post
              key={tweet.id}
              className="post"
              author={{ name: tweet.author_name, avatar: tweet.author_avatar }}
              handle={tweet.author_handle}
              content={tweet.content}
              date={tweet.date} // add date prop
              likes={tweet.likes} // add likes prop
            />
          ))}
      </div>
      <RightSidebar hashtags={hashtags} nonFollowedUsers={nonFollowedUsers} />
    </div>
  );
};

export default Dashboard;
