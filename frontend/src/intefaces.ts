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
}

export interface ProfileInterface {
  tweets: Tweet[];
  count_followers: number;
  count_following: number;
  following_already: boolean;
  first_name: string;
  last_name: string;
}
