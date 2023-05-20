import "./Post.scss";
import React from "react";
import { PostProps } from "./interfaces";
import moment from "moment";

const Post: React.FC<PostProps> = (props) => {
  const { content, created_at, tweet_id, author, ...HTMLElements } = props;

  const { first_name, username } = author;

  const calculateTime = (time: string) => {
    const now = moment();
    const tweetTime = moment(time);
    const diff = now.diff(tweetTime, "hours");
    return diff;
  };
  return (
    <div {...HTMLElements}>
      <div className={`post-container`}>
        <div className="post-header">
          <div className="post-header-info">
            <div className="post-author">{first_name}</div>
            <div className="post-handle">@{username}</div>
            <div className="post-created-at">{calculateTime(created_at)}h</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{props.likes} likes</div>
      </div>
    </div>
  );
};

export default Post;
