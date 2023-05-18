import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './EventsPage.css'
import dotenv from 'dotenv';
import { getAllEDMTRAINEvents } from "../../store/edmtrain";

dotenv.config();

const EventsPage = () => {
    // Reminder: Need to learn AWS to serve images
    // const [events, setEvents] = useState([])
    const dispatch = useDispatch()
        // old way of getting events fetching from front end
    // const apiKey = process.env.EDMTRAIN_KEY;
    // console.log(apiKey);
    // const edmAPI = 'https://edmtrain.com/api'
    // console.log("edmAPI =>", edmAPI)``
    // useEffect(() => {
    //     fetch(`${edmAPI}/events?client=ommittedForGithub`)
    //         .then(res => res.json())
    //         .then(data => setEvents(data))
    //         .catch(err => console.log(err))
    // }, [])

    // trying out new way from Roosevelt
    const eventsObj = useSelector((state) => state.events)
    console.log('eventsObj =>', eventsObj)
    const events = Object.values(eventsObj)
    debugger
    console.log('events => ', events)
    useEffect(() => {
        dispatch(getAllEDMTRAINEvents())
    }, [dispatch])

    if (!events.length) return <>Loading.....</>
    return (
        <div className="events-page">
            <header className="events-data-header">
                <h2>EDMTRAIN Events</h2>
            </header>
            <ul className="edmtrain-events-list">
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
