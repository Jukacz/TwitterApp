import "./Post.scss";
import React, { useState } from "react";
import { PostProps } from "./interfaces";
import moment from "moment";
import { useNavigate } from "react-router-dom";
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
    ...HTMLElements
  } = props;
  const navigate = useNavigate();

  const [licked, setLicked] = useState(false);
  const [openedComments, setOpenedComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const toast = useToast();

  const calculateTime = (time: string) => {
    const now = moment();
    const tweetTime = moment(time);
    const diff = now.diff(tweetTime, "hours");
    return diff;
  };

  const give_like = async () => {
    const data_to_like = {
      uuid: tweet_uuid,
    };
    const response_from_like = await requestToApi
      .post("/like/", data_to_like)
      .catch((err) => err.response);

    if (response_from_like.data.success) {
      setLicked(true);
      return;
    }
    toast({
      title: "Błąd",
      description: "Wystąpił błąd podczas polubienia tweeta",
      status: "error",
    });
  };

  return (
    <div {...HTMLElements}>
      <div className={`post-container post`}>
        <div className="post-header">
          <div className="post-header-info">
            <div
              className="post-author"
              onClick={() => navigate(`/${username}`)}
            >
              {first_name}
            </div>
            <div className="post-handle">@{username}</div>
            <div className="post-created-at">{calculateTime(created_at)}h</div>
          </div>
        </div>
        <div className="post-content">{content}</div>
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
              <div className="add-my-comment-section">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
