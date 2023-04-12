import "./Post.scss";
import React, { HTMLAttributes } from "react";

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  author: {
    name: string;
    avatar: string;
  };
  handle: string;
  content: string;
  date: string;
  likes: number;
}

const Post: React.FC<PostProps> = ({
  author,
  handle,
  content,
  date,
  likes,
  className,
}) => {
  return (
    <div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
      <div className={`post-container ${className}`}>
        <div className="post-header">
          <img src={author.avatar} alt={`${author.name} avatar`} />
          <div className="post-header-info">
            <div className="post-author">{author.name}</div>
            <div className="post-handle">@{handle}</div>
            <div className="post-date">{date}</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
        <div className="post-likes">{likes} likes</div>
      </div>
    </div>
  );
};

export default Post;
