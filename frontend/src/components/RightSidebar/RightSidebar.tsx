import React, { useEffect, useState } from "react";
import "./RightSidebar.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { lastHashtagInterface } from "../../intefaces";
import { useToast } from "@chakra-ui/react";
import requestToApi from "../axios";
import { UserInterface } from "../ModalFollowers/interface";
import { set } from "cookies";

const RightSidebar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [lastHashtags, setlastHashtags] = useState<string[]>([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filtredList, setFiltredList] = useState<string[]>([]);
  const [nonFollowedUsers, setNonFollowedUsers] = useState<UserInterface[]>([]);
  const toast = useToast();

  const get_non_follow_users = async () => {
    const response_from_users = await requestToApi
      .get("me/iDontFollow/")
      .catch((err) => err.response);

    if (response_from_users.data.success) {
      setNonFollowedUsers(response_from_users.data.users);
      return;
    }
    toast({
      title: "Błąd",
      description: "Nie udało się pobrać użytkowników",
      status: "error",
    });
  };
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
    get_non_follow_users();
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
        .post("/search/hashtags/", { hashtag: searchValue.slice(1) })
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
            {nonFollowedUsers.length === 0 ? (
              <h1 className="u-folow-everyone">Followujesz Wszystkich</h1>
            ) : (
              nonFollowedUsers.slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/${user.username}`)}
                  className="user"
                >
                  @{user.username}
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
            filtredList.map((value, index) => (
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
