import React, { useEffect, useState } from "react";
import "./RightSidebar.scss";
import { useNavigate } from "react-router-dom";
import requestToApi from "../axios";
import { UserInterface } from "../ModalFollowers/interface";
import { useToast } from "@chakra-ui/react";
import { set } from "cookies";

const RightSidebar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filtredList, setFiltredList] = useState<string[]>([]);
  const [nonFollowedUsers, setNonFollowedUsers] = useState<UserInterface[]>([]);
  const toats = useToast();

  const hashtags = ["react", "typescript", "javascript"];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredHashtags = hashtags.filter((hashtag) =>
    hashtag.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const init = async () => {
      const response_from_users = await requestToApi
        .get("me/iDontFollow/")
        .catch((err) => err.response);

      if (response_from_users.data.success) {
        setNonFollowedUsers(response_from_users.data.users);
        return;
      }
      toats({
        title: "Błąd",
        description: "Nie udało się pobrać użytkowników",
        status: "error",
      });
    };

    init();
  }, []);

  useEffect(() => {
    if (searchValue.length === 0) return;

    const searchFn = async () => {
      setFiltredList([]);
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
            <h2>Popular hashtags</h2>
            {hashtags.map((hashtag, index) => (
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
