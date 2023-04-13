import "./Dashboard.scss";
import React from "react";
import { Sidebar, Post, RightSidebar, TweetForm } from "../../components";
import { PostProps } from "../../components/Post/Post";

const Dashboard: React.FC = () => {
  const author = {
    name: "John Smith",
    avatar:
      "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
  };
  const handle = "johnsmith";
  const content = "Hello, world!";
  const date = "2023-04-12";
  const likes = 42;
  const hashtags = ["react", "typescript", "javascript"];
  const nonFollowedUsers = [
    "@ogrodas",
    "@pingwinek2115",
    "@frontendnawypasie.com",
    "@reactjs",
  ];

  const postProps: PostProps = {
    author: author,
    handle: handle,
    content: content,
    date: date,
    likes: likes,
  };

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
        <Post className="post" {...postProps} />
      </div>
      <RightSidebar hashtags={hashtags} nonFollowedUsers={nonFollowedUsers} />
    </div>
  );
};

export default Dashboard;
