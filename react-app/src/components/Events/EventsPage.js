import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsPage.css'
import { getAllEDMTRAINEvents } from "../../store/edmtrain";


const EventsPage = () => {
    // Reminder: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)
    useEffect(() => {
        dispatch(getAllEDMTRAINEvents())
    }, [dispatch])

    if (!events.length) return <>Loading.....</>
    return (
        <div className="events-page">
            <ul className="edmtrain-events-list">
                <header className="events-data-header">
                    <h2>EDMTRAIN Events</h2>
                </header>
                {events?.filter(event => event.name)?.map((event, index) => (
                    <li key={index} className="edmtrain-event">
                        <div className="event-id-and-name">{event.id} | {event.name}</div>
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
