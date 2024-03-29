export interface Tweet {
  id: number;
  uuid: string;
  content: string;
  username: string;
  first_name: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  updated_at: string;
  already_liked: boolean;
}

export interface ProfileInterface {
  id: number;
  tweets: Tweet[];
  count_followers: number;
  count_following: number;
  following_already: boolean;
  first_name: string;
  last_name: string;
}

export interface lastHashtagInterface {
  id: number;
  hashtag: string;
  count: number;
}
