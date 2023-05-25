import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LikeButton = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.users.currentUser);
  const handleClick = () => {
    setLiked(!liked);
    if (liked) {
      // Get the current user.

      // Get the event.
      const event = event;

    //   // Add the event to the user's likes.
    //   const db = useDispatch("db");
    //   db.session.add({
    //     user_id: currentUser.id,
    //     event_id: event.id,
    //   });

    //   // Commit the changes to the database.
    //   db.session.commit();
    // } else {
    //   // Remove the event from the user's likes.
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
