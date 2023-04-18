import React, { useState } from "react";
import "./RightSidebar.scss";

interface RightSidebarProps {
  hashtags: string[];
  nonFollowedUsers: string[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  hashtags,
  nonFollowedUsers,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredHashtags = hashtags.filter((hashtag) =>
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
        {filteredHashtags.map((hashtag, index) => (
          <div key={index} className="hashtag">
            #{hashtag}
          </div>
        ))}
      </div>
      <div className="users-container">
        <h2>Users you don't follow</h2>
        {filteredUsers.map((user, index) => (
          <div key={index} className="user">
            {user}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
