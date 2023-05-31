import "./Post.scss";
import React, { useEffect, useState } from "react";
import { PostProps, TweetComment } from "./interfaces";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import requestToApi from "../axios";
import { Toast, useToast } from "@chakra-ui/react";

const Post: React.FC<PostProps> = (props) => {
  const {
    tweet_id,
    tweet_uuid,
    content,
    created_at,
    author: { first_name, username },
    likes_number,
    comment_numnber,
    updated_at,
    liked,
    ...HTMLElements
  } = props;
  const navigate = useNavigate();

  const [licked, setLicked] = useState(liked);
  const [openedComments, setOpenedComments] = useState(false);
  const [comments, setComments] = useState<TweetComment[]>([]);
  const [commentText, setCommentText] = useState("");

  const toast = useToast();

  const calculateTime = (time: string) => {
    const now = moment();
    const tweetTime = moment(time);
    const diff = now.diff(tweetTime, "hours");
    if (diff < 1) {
      return now.diff(tweetTime, "minutes").toString() + " minutes";
    }
    if (diff > 24) {
      return now.diff(tweetTime, "days").toString() + " days";
    }
    if (diff > 168) {
      return (
        now.diff(tweetTime, "weeks") +
        `${now.diff(tweetTime, "weeks") > 1 ? " weeks" : " week"}`
      );
    }
  };

  const give_like = async () => {
    const data_to_like = {
      uuid: tweet_uuid,
    };
    const response_from_like = await requestToApi
      .post("/like/", data_to_like)
      .catch((err) => err.response);

    if (response_from_like.data.success) {
      setLicked((state) => !state);
      return;
    }
    toast({
      title: "Błąd",
      description: "Wystąpił błąd podczas polubienia tweeta",
      status: "error",
    });
  };

  const get_comments = async () => {
    const response_from_get_comments = await requestToApi
      .get(`/comment/${tweet_uuid}/`)
      .catch((err) => err.response);

    if (response_from_get_comments.data.success) {
      return response_from_get_comments.data.comments;
    }
    toast({
      title: "Błąd",
      description: "Wystąpił błąd podczas pobierania komentarzy",
      status: "error",
    });
  };

  const add_comment = async (e: React.FormEvent) => {
    e.preventDefault();
    const data_to_add_comment = {
      content: commentText,
    };
    const response_from_add_comment = await requestToApi
      .post(`/comment/${tweet_uuid}/`, data_to_add_comment)
      .catch((err) => err.response);

    if (response_from_add_comment.data.success) {
      toast({
        title: "Sukces",
        description: "Dodano komentarz",
        status: "success",
      });
      setCommentText("");
      const new_comments = await get_comments();
      setComments(new_comments);
      return;
    }
    toast({
      title: "Błąd",
      description: "Wystąpił błąd podczas dodawania komentarza",
      status: "error",
    });
  };

  useEffect(() => {
    const init = async () => {
      if (openedComments) {
        const response_comments = await get_comments();
        setComments(response_comments);
      }
    };
    init();
  }, [openedComments]);

  return (
    <div {...HTMLElements}>
      <div className={`post-container post`}>
        <div className="post-header">
          <div className="post-header-info">
            <img src="https://picsum.photos/200" alt="" />
            <div
              className="post-author"
              onClick={() => navigate(`/${username}`)}
            >
              {first_name}
            </div>
            <div className="post-handle">@{username}</div>
            <div className="post-created-at">{calculateTime(created_at)}</div>
          </div>
        </div>
        <div className="post-content">
          {content.split(" ").map((word, index) => {
            console.log(word.trim());
            if (word.startsWith("#")) {
              return (
                <NavLink
                  className="hashtag"
                  to={`/hashtag/${word.substring(1)}`}
                  key={index}
                >
                  {word}{" "}
                </NavLink>
              );
            }
            if (word.startsWith("@")) {
              return (
                <NavLink
                  className="hashtag"
                  to={`/${word.substring(1)}`}
                  key={index}
                >
                  {word}{" "}
                </NavLink>
              );
            }

            return word + " ";
          })}
        </div>
        <div className="post-footer">
          <div className="footer-buttons-section">
            <button
              onClick={() => give_like()}
              className={`post-likes button-post ${
                licked ? "licked-already" : ""
              }`}
            >
              {licked ? likes_number + 1 : likes_number}{" "}
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              onClick={() => setOpenedComments((state) => !state)}
              className="open-comment-section-button button-post"
            >
              {comment_numnber}
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
          {openedComments && (
            <div className="comment-section-container">
              <h2 className="title">
                Wszystkie Komentarze ({comment_numnber})
              </h2>
              <form onSubmit={add_comment} className="add-my-comment-section">
                <img src="https://picsum.photos/200" alt="" />
                <input
                  type="text"
                  placeholder="Dodaj komentarz"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="button-post">
                  Dodaj <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
              <div className="comments-section">
                {comments.map((comment, index) => {
                  const { first_name, username, content, created_at } = comment;
                  return (
                    <div key={index} className="comment">
                      <div className="comment-header">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="comment-header-info">
                          <p
                            onClick={() => navigate(`/${username}`)}
                            className="first_name"
                          >
                            {first_name}
                          </p>
                          <p className="username">@{username}</p>
                          <p className="created_at">
                            {calculateTime(created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="comment-content">
                        <p className="content">{content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
