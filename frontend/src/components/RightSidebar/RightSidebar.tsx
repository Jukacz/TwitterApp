import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { lastHashtagInterface } from "../../intefaces";
import { useToast } from "@chakra-ui/react";
import requestToApi from "../axios";
import { UserInterface } from "../ModalFollowers/interface";
import { set } from "cookies";
import VerifyProfileContext from "../../contexts/verifyprofile.context";
import { RightSideBarInterface } from "./interface";

const RightSidebar: React.FC<RightSideBarInterface> = ({
  lastHashtags,
  nonFollowerUsers,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [filtredList, setFiltredList] = useState<string[]>([]);

  const context = useContext(VerifyProfileContext)!;

  const { getLastHashtags, get_non_follower_users } = context;
  useEffect(() => {
    getLastHashtags();
    get_non_follower_users();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length === 0) return;

    const searchFn = async () => {
      if (searchValue.startsWith("@")) {
        const response_from_search_users = await requestToApi
          .post("search/users/", { user: searchValue.slice(1) })
          .catch((err) => err.response);

        if (response_from_search_users.data.success) {
          setFiltredList(response_from_search_users.data.users);
          return;
        }
        return;
      }
      const response_from_search_hashtags = await requestToApi
        .post("/search/hashtags/", {
          hashtag: searchValue.slice(searchValue[0] === "#" ? 1 : 0),
        })
        .catch((err) => err.response);

      if (response_from_search_hashtags.data.success) {
        setFiltredList(response_from_search_hashtags.data.hasztags);
        return;
      }
    };

    searchFn();
  }, [searchValue]);

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
      {searchValue.length === 0 ? (
        <>
          <div className="hashtags-container">
            <h2>Najpopularniejsze Hasztagi</h2>
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
            <h2>Użytkownicy, których nie obserwujesz</h2>
            {nonFollowerUsers.length === 0 ? (
              <h1 className="u-folow-everyone">Followujesz Wszystkich</h1>
            ) : (
              nonFollowerUsers.slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/${user}`)}
                  className="user"
                >
                  @{user}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Wyniki wyszukiwania</h1>
          {filtredList.length === 0 ? (
            <h1>Nie znaleziono żadnych wyników</h1>
          ) : (
            filtredList.slice(0, 10).map((value, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    searchValue.startsWith("@")
                      ? `/${value}`
                      : `/hashtag/${value}`
                  )
                }
                className="searched_value"
              >
                {searchValue.startsWith("@") ? "@" : "#"}
                {value}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default RightSidebar;
