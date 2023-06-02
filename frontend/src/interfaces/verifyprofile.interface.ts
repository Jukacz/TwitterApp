export interface VerifyProfileInterface {
  get_non_follower_users: () => string[] | Promise<any> | void;
  getLastHashtags: () => string[] | Promise<any> | void;
}
