import "./ResultsPage.css"
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LikeButton from "../Likes/CreateLike/CreateLike-";
import { getUserLikesThunk } from "../../store/likes";
const ResultsItem = ({ event }) => {

    const currentUser = useSelector(state => state?.session?.user)
    const likesObj = useSelector(state => state.likes)
    const likes = Object.values(likesObj)
    const location = useLocation()

    // creating date
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    const date = new Date(event?.createdAt)
    const month = months[date?.getMonth()];
    const day = date?.getDate();
    const year = date?.getFullYear();
    const hoursMin = date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });

    return (
        <>
            {
                <div className="user-event">

                    <Link className="link-to-event" to={`/events/${event.id}`}>
                        <div className="preview-image-container">
                        <img className="preview-image-event" src={event.event_preview_image}></img>
                        </div>
                        <div className="event-info">
                            <div className="event-id-and-name">{event.event_name}</div>
                            <div className="date" style={{ fontWeight: "bold" }}>{new Date(event.event_start_date).toLocaleDateString()}</div>
                            <div className="location">{event.event_city}, {event.event_state}</div>
                            <div className="owner">Organizer: {event.owner.username}</div>
                        </div>
                    </Link>
                    {
                        // currentUser ? <LikeButton currentUser={currentUser} eventId={event.id} likes={likes} /> : <></>
                    }
                </div>

            }
        </>
    )
}

export default ResultsItem
