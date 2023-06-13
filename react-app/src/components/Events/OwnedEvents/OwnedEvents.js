import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
// import { useHistory } from "react-router-dom";
// import OpenModalButton from "../../OpenModalButton";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";
import OpenModalDelete from "./OpenModalDelete";
import "./OwnedEvents.css"
const OwnedEventsPage = () => {
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getEventsThunk())
    }, [dispatch])

    if (!events.length || !events) return <>Loading.....</>
    return (
        <div className="events-page">
            <h2>Your Owned Events</h2>
            <ul className="user-events-list-owned">
                {
                    events?.filter(event => event.owner?.id === sessionUser.id)?.map((event, index) => (
                        <li key={index} className="owned-event">
                            {/* <Link to={`events/${event.id}`}> */}
                            <div className="image-card-container">
                                <img className="preview-image-event" src={event.event_preview_image}></img>
                            </div>
                            <div className="event-info">
                                <div className="name-date">
                                    <div className="event-id-and-name">{event.event_name}</div>
                                    <div className="date" style={{ fontWeight: "bold" }}>{new Date(event.event_start_date).toLocaleDateString()}</div>
                                </div>
                                <div className="location-owner">
                                    <div className="location" style={{ "color": "gray" }}>{event.event_venue} &middot; {event.event_city}, {event.event_state}</div>
                                    <div className="owner">Organizer: {event.owner.username}</div>
                                    <div className="update-delete-container">
                                        <div className="update">
                                            <Link to={`/events/${event.id}/edit`}>
                                                <button id="update-button">Update</button>
                                            </Link>
                                        </div>
                                        <div className="delete-event">
                                            <button className="delete-button">
                                                <OpenModalDelete
                                                    itemText="Delete"
                                                    modalComponent={<DeleteEventModal eventId={event.id}
                                                    />}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};


export default OwnedEventsPage
