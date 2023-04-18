import React from "react";

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  isLogged: boolean;
}

export interface UserContextInterface {
  user: User;
  setUser: (user: User) => void;
}
