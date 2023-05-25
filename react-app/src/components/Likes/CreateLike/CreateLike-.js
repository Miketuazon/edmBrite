import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likeOneEventThunk } from "../../../store/likes";
import { deleteLikeThunk } from "../../../store/likes";
import { getUserLikesThunk } from "../../../store/likes";
const LikeButton = ({ currentUser, eventId, likes }) => {
  const [buttonValue, setButtonValue] = useState("Like");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && likes.includes(eventId)) {
      setButtonValue("Unlike");
    } else {
      setButtonValue("Like");
    }
  }, [currentUser, eventId]);

  const handleClick = () => {
    if (buttonValue === "Like") {
      setButtonValue("Unlike");
      dispatch(likeOneEventThunk(eventId));
    } else {
      setButtonValue("Like");
      dispatch(deleteLikeThunk(eventId));
    }
  };

  return (
    <button onClick={handleClick} className="handle-like-click">
      {buttonValue}
    </button>
  );
};

export default LikeButton;
