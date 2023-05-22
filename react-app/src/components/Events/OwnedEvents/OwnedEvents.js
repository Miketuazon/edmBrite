import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";
import OpenModalDelete from "./OpenModalDelete";

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
            <ul className="edmtrain-events-list">
                <header className="events-data-header">
                </header>
                <h2>User created Events</h2>
                {
                    events?.filter(event => event.owner?.id === sessionUser.id)?.map((event, index) => (
                        <li key={index} className="user-event">
                            <Link to={`events/${event.id}`}>
                                <div className="event-id-and-name">{event.id} | {event.event_name}</div>
                            </Link>
                            <div className="date">{new Date(event.event_start_date).toLocaleDateString()}</div>
                            <div className="location">{event.location}</div>
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
                            <br />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};


export default OwnedEventsPage
