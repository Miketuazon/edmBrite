import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeOneEventThunk } from "../../../store/likes";

const LikeButton = ({ events, currentUser, eventId }) => {
  const [liked, setLiked] = useState(null)
  const dispatch = useDispatch()
  console.log("events =>", events)
  console.log("currentUser => ", currentUser)
  console.log("eventId => ", eventId)


  useEffect(() => {
    if (currentUser.events_liked.includes(eventId)) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }, [currentUser.events_liked, eventId]);

  const handleClick = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    dispatch(likeOneEventThunk(eventId))
  };

  return (
    <button onClick={handleClick} className="handle-like-click">
      {liked ? "Like" : "Unlike"}
    </button>
  );
};

export default LikeButton;
