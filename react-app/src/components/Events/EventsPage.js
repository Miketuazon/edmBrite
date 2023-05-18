import { useEffect } from "react";
import { useState } from "react";
import './EventsPage.css'
import dotenv from 'dotenv';

dotenv.config();

const EventsPage = () => {
    // Reminder: Need to learn AWS to serve images
    const [events, setEvents] = useState([])

    const apiKey = process.env.EDMTRAIN_KEY;
    console.log(apiKey);
    const edmAPI = 'https://edmtrain.com/api'
    // console.log("edmAPI =>", edmAPI)``
    useEffect(() => {
        fetch(`${edmAPI}/events?client=148b8477-b3d4-4ffb-aca6-08fc7ef7f23a`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="events-page">
            <header className="events-data-header">
                <h2>EDMTRAIN Events</h2>
            </header>
            <ul className="edmtrain-events-list">
                {events.data?.filter(event => event.name)?.map((event, index) => (
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
