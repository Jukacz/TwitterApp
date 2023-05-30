import React, { useEffect, useState } from "react";
import "./RightSidebar.scss";
import { useNavigate } from "react-router-dom";
import requestToApi from "../../components/axios";
import axios from "axios";
import { lastHashtagInterface } from "../../intefaces";
import { useToast } from "@chakra-ui/react";

const RightSidebar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [lastHashtags, setlastHashtags] = useState<string[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const getLastHashtags = async () => {
    const response = await requestToApi
      .get("last-hashtags/")
      .catch((err) => err.response);

    if (response.data.success) {
      setlastHashtags(response.data.hashtags);
      console.log("hashtags", response.data.hashtags);
      return;
    }
    toast({
      title: "Nie udało sie pobrać hashtagów",
      description: "Spróbuj ponownie później",
    });
  };
  useEffect(() => {
    getLastHashtags();
  }, []);

  const nonFollowedUsers = [
    "ogrodas",
    "pingwinek2115",
    "frontendnawypasie.com",
    "reactjs",
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredHashtags = lastHashtags.filter((hashtag) =>
    hashtag.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredUsers = nonFollowedUsers.filter((user) =>
    user.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="right-sidebar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search hashtags and users"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="hashtags-container">
        <h2>Popular hashtags</h2>
        {lastHashtags.map((hashtag, index) => (
          <div
            key={index}
            onClick={() => navigate(`/hashtag/${hashtag}`)}
            className="hashtag"
          >
            #{hashtag}
          </div>
        ))}
      </div>
      <div className="users-container">
        <h2>Users you don't follow</h2>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => navigate(`/${user}`)}
            className="user"
          >
            @{user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
