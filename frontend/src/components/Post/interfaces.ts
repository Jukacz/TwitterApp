import { HTMLAttributes } from "react";

interface Author {
  username: string;
  first_name: string;
}

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  tweet_id: number;
  tweet_uuid: string;
  content: string;
  created_at: string;
  author: Author;
  likes_number: number;
  comment_numnber: number;
  updated_at: string;
}

export interface TweetComment {
  username: string;
  first_name: string;
  content: string;
  created_at: string;
}
