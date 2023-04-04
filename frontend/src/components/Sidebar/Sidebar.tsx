import "./Sidebar.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBookmark,
  faHashtag,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1>Logo</h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <FontAwesomeIcon icon={faHouse} className="fa-icon" />
            <span>Home</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faHashtag} className="fa-icon" />
            <span>Explore</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} className="fa-icon" />
            <span>Notifications</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faBookmark} className="fa-icon" />
            <span>Bookmarks</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} className="fa-icon" />
            <span>Profile</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
