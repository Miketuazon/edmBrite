import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsPage.css'
import {Link} from "react-router-dom"
import { getAllEDMTRAINEvents } from "../../store/edmtrain";
import { useHistory } from "react-router-dom";

const EventsPage = () => {
    // Reminder: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)

    // console.log(process.env.REACT_APP_EDMTRAIN_KEY) //this is the way to do call it next time
    useEffect(() => {
        dispatch(getAllEDMTRAINEvents())
    }, [dispatch])
    console.log(events)
    const dbEvents = useSelector((action) => action.events.db_data)
    console.log(dbEvents)
    if (!events.length) return <>Loading.....</>
    return (
        <div className="events-page">
            <ul className="edmtrain-events-list">
                <header className="events-data-header">
                </header>
                    <h2>User created Events</h2>
                {
                    events?.filter(event => event.event_name)?.map((event, index) => (
                        <li key={index} className="user-event">
                        <div className="event-id-and-name">{event.id} | {event.event_name}</div>
                        <div className="date">{event.start_date}</div>
                        <div className="location">{event.location}</div>
                        <br />
                    </li>
                    ))
                }
                    <h2>EDMTRAIN Events</h2>
                {events?.filter(event => event.name)?.map((event, index) => (
                    <li key={index} className="edmtrain-event">
                        <Link className="event-id-and-name" to={`${event.link}`}>{event.id} | {event.name}</Link>
                        <div className="date">{event.date}</div>
                        <div className="location">{event.venue.location}</div>
                        <br />
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default EventsPage
