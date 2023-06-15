import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UserLikesPage.css'
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
import { useHistory } from "react-router-dom";
import { likeOneEventThunk } from "../../../store/likes";
import { getUserLikesThunk } from "../../../store/likes";
const UserLikesPage = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const eventsObj = useSelector(state => state.events)
    const events = Object.values(eventsObj)
    // console.log("events => ", events)
    const userLikedEvents = useSelector(state => state.session.user?.events_liked)
    // console.log("userLikedEvents => ", userLikedEvents)
    const likesObj = useSelector(state => state.likes)
    const likes = Object.values(likesObj)
    // console.log(likes)
    useEffect(() => {
        dispatch(getEventsThunk())
        dispatch(getUserLikesThunk())
    }, [dispatch, userLikedEvents])

    if (!currentUser) return <h1 style={{ color: "red" }}>Unauthorized. You are not logged in</h1>
    if (!userLikedEvents) return <h1>Loading...</h1>
    return (
        <div className="likes-page">
            <h1>Likes</h1>
            <ul className="likes-container">
                {
                    likes.length > 0 ?

                        events.filter(event => likes.includes(event.id))
                            .map(event => (
                                <div key={event.id} className="event-liked">
                                    <img className="preview-image-events" src={event.event_preview_image} alt="https://djmag.com/sites/default/files/styles/djm_23_961x540_jpg/public/article/image/EDC%20Vegas%20-%20DJ%20MAG.png.jpg"></img>
                                    <div className="event-id-and-name">{event.event_name}</div>
                                    <div className="date" style={{ fontWeight: "bold" }}>{new Date(event.event_start_date).toLocaleDateString()}</div>
                                    <div className="location">{event.event_city}, {event.event_state}</div>
                                    <div className="owner">Organizer: {event.owner.username}</div>
                                </div>
                            ))
                        :
                        <div className="no-likes">
                            <h1 className="no-likes-header">You currently have no likes :( </h1>
                            <h3>Go like an event!</h3>
                        </div>
                }
            </ul>
        </div>
    )
}

export default UserLikesPage
