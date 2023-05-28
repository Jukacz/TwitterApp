import { HTMLAttributes } from "react";

interface Author {
  username: string;
  first_name: string;
}

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  tweet_id: number;
  content: string;
  created_at: string;
  author: Author;
  likes?: number;
}
