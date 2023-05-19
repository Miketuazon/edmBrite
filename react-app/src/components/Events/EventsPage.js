import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsPage.css'
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../store/events";
import { useHistory } from "react-router-dom";

const EventsPage = () => {
    // Reminder: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)
    // console.log(events)
    // console.log(process.env.REACT_APP_EDMTRAIN_KEY) //this is the way to do call it next time
    useEffect(() => {
        dispatch(getEventsThunk())
    }, [dispatch])

    const [edmtrainEvents, setEdmtrainEvents] = useState([])
    const [state, setState] = useState("New York")
    const [stateCode, setStateCode] = useState("NY")
    const [longitude, setLongitude] = useState(-74.006)
    const [latitude, setLatitude] = useState(40.713)
    const apiKey = process.env.REACT_APP_EDMTRAIN_KEY
    const edmAPI = 'https://edmtrain.com/api'
    useEffect(() => {
        fetch(`${edmAPI}/events?latitude=${latitude}&longitude=${longitude}&state=${state}&client=${apiKey}`)
            .then(res => res.json())
            .then(data => setEdmtrainEvents(data))
            .catch(err => console.log(err))
    }, [latitude, longitude, state])
    // console.log("edmtrainEvents =>", edmtrainEvents)
    const apiEvents = edmtrainEvents.data

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
                <h3 className="location-changer">Located: {state}</h3>
                {   edmtrainEvents.success === true ?
                    apiEvents.filter(event => event.name)?.map((event, index) => (
                        <li key={index} className="edmtrain-event">
                            <a className="event-id-and-name" target="_blank" href={`${event.link}`}>{event.id} | {event.name}</a>
                            <div className="date">{event.date}</div>
                            <div className="location">{event.venue.location}</div>
                            <br />
                        </li>
                    ))
                    : null
                }

            </ul>
        </div>
    );
};

export default EventsPage
