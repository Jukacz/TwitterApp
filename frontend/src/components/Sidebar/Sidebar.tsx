import "./Sidebar.scss";
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBookmark,
  faHashtag,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/user.context";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import requestToApi from "../axios";

const Sidebar: React.FC = () => {
  const context = useContext(UserContext)!;
  const myUsermame = context.user.username;
  const myfirstname = context.user.first_name;

  const navigate = useNavigate();
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });

  const logout = async () => {
    const logout_response = await requestToApi
      .post("/logout/")
      .catch((err) => err.response);

    if (logout_response.data.success) {
      context.setUser({
        username: "",
        first_name: "",
        last_name: "",
        isLogged: false,
        email: "",
      });
      navigate("/login");
      toast({
        title: "Wylogowano",
        description: "Zostałeś wylogowany",
        status: "info",
      });
      return;
    }
    toast({
      title: "Błąd",
      description: "Nie udało się wylogować",
      status: "error",
    });
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1>Logo</h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <NavLink to="/">
            <FontAwesomeIcon icon={faHouse} className="fa-icon" /> Strona Główna{" "}
          </NavLink>
          <NavLink to="/hashtags">
            <FontAwesomeIcon icon={faHashtag} className="fa-icon" /> Odkrywaj
          </NavLink>
          <NavLink to={`/${myUsermame}`}>
            <FontAwesomeIcon icon={faUser} className="fa-icon" /> Profile
          </NavLink>
        </ul>
      </div>
      <div className="sidebar-footer">
        <Menu>
          <MenuButton>
            <div className="user-info">
              <img src="https://picsum.photos/200" alt="user" />
              <div className="user-info-text">
                <h4>{myUsermame}</h4>
                <p>{myfirstname}</p>
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to={`/${myUsermame}`}>Mój profil</NavLink>
            </MenuItem>
            <MenuItem onClick={() => logout()}>Wyloguj sie</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
