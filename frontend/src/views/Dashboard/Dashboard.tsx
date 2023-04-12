import "./Dashboard.scss";
import React from "react";
import { Sidebar, Post, RightSidebar } from "../../components";
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
  ];

  const postProps: PostProps = {
    author: author,
    handle: handle,
    content: content,
    date: date,
    likes: likes,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <Post className="post" {...postProps} />
      <RightSidebar hashtags={hashtags} nonFollowedUsers={nonFollowedUsers} />
    </div>
  );
};

export default Dashboard;
