import React from "react";

export interface ModalProps {
  mode: "followers" | "following";
  username: string;
  children: React.ReactNode | JSX.Element | JSX.Element[];
}

export interface UserInterface {
  username: string;
  first_name: string;
}
