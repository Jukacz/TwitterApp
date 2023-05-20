export interface Tweet {
  id: number;
  content: string;
  username: string;
  first_name: string;
  created_at: string;
}

export interface ProfileInterface {
  tweets: Tweet[];
  count_followers: number;
  count_following: number;
  first_name: string;
  last_name: string;
}
