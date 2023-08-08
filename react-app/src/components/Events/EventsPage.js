import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsPage.css'
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../store/events";
import stateData from "./locations.json"
import LikeButton from "../Likes/CreateLike/CreateLike-";
import { getUserLikesThunk } from "../../store/likes";
const EventsPage = () => {
    // Todo: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)
    const currentUser = useSelector(state => state?.session?.user)
    const likesObj = useSelector(state => state.likes)
    const likes = Object.values(likesObj)
    // console.log("likes => ", likes)
    useEffect(() => {
        dispatch(getEventsThunk())
        dispatch(getUserLikesThunk())
    }, [dispatch])

    const [edmtrainEvents, setEdmtrainEvents] = useState([])
    const [state, setState] = useState("New York")
    const [longitude, setLongitude] = useState(-74.006)
    const [latitude, setLatitude] = useState(40.713)
    const apiKey = process.env.REACT_APP_EDMTRAIN_KEY
    const edmAPI = 'https://edmtrain.com/api'
    // console.log("stateData =>", stateData.data )

    // grab coordinates from json
    const stateJsonData = stateData.data
    const statesNullCity = stateJsonData.filter((state) => state.city === null || state.city === "Washington")
    const reducedStatesObj = statesNullCity.reduce((newObj, state) => {
        newObj[state.state] = {
            state: state.state,
            latitude: state.latitude,
            longitude: state.longitude
        }
        return newObj;
    }, {})
    // console.log("reducedStates => ", reducedStates)
    // console.log("states => ", Object.keys(reducedStates))
    // console.log("reducedStatesObj => ", reducedStatesObj)
    const reducedStates = Object.values(reducedStatesObj)
    // console.log("reducedStates => ", reducedStates)
    const handleStateChange = (e) => {
        const selectedValue = e.target.value;
        const selectedState = reducedStates.find((state) => state.state === selectedValue);

        setState(selectedState.state);
        setLatitude(selectedState.latitude);
        setLongitude(selectedState.longitude);
    };

    useEffect(() => {
        fetch(`${edmAPI}/events?latitude=${latitude}&longitude=${longitude}&state=${state}&client=${apiKey}`)
            .then(res => res.json())
            .then(data => setEdmtrainEvents(data))
            .catch(err => console.log(err))
    }, [latitude, longitude, state, apiKey])
    // console.log("edmtrainEvents =>", edmtrainEvents)

    const addOneDay = (date) => {
        const originalDate = new Date(date)
        originalDate.setDate(originalDate.getDate() + 1)
        const day = originalDate.getDate();
        const month = originalDate.getMonth() + 1;
        const year = originalDate.getFullYear();

        const formattedDate = `${month}/${day}/${year}`
        return formattedDate
    }
    // variable to hold today's date as a string to compare if event is past or not
    const todayDateStr = new Date().toISOString()

    const apiEvents = edmtrainEvents.data
    if (!events.length) return <>Loading.....</>
    return (
        <div className="events-page">
            <div classname="image-on-top">
                <img src="https://wallpaperaccess.com/full/3990922.jpg" alt="image" className="image-on-topp"></img>
            </div>
            <ul className="events-list">
                <div className="top-of-events">
                    <div className="left-side-events">
                        <h2><i class="fa-solid fa-ticket"></i> User Created Events</h2>
                        <h3>Find events curated from users like yourself!</h3>
                    </div>
                    <div className="click-here">
                        <h2>Want to find real events?</h2>
                        <div className="click-container-edm">
                        <a href="#edmtrain-header" className="click-edmtrain">Click here!</a>
                        </div>
                    </div>
                </div>
                <div className="user-events-list">
                    {
                        events?.filter(event => event.event_name && event.event_end_date > todayDateStr)?.map((event) => (
                            <article key={event.id} className="user-event">
                                <Link className="link-to-event" to={`events/${event.id}`} target="_blank">
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
                                            <div className="owner" style={{ "color": "#39364F", "fontWeight": "bold" }}>Organizer: {event.owner.username}</div>
                                        </div>
                                    </div>
                                </Link>
                                {
                                    currentUser ? <LikeButton events={events} currentUser={currentUser} eventId={event.id} likes={likes} /> : <></>
                                }
                            </article>
                        ))
                    }
                </div>
                <h2 id="edmtrain-header"><i class="fa-solid fa-ticket"></i> EDMTRAIN Events</h2>
                <h3>Click below to select a state!</h3>
                <h3>Events in &nbsp;
                <select className="selected-state" value={state} onChange={handleStateChange}>
                    {reducedStates.map((state) => (
                        <option key={state.id} value={state.state}>
                            {state.state}
                        </option>
                    ))}
                </select>
                </h3>
                <div className="location-changer">
                    {/* <h3>Current state selected:</h3>
                    <h3>{state}</h3> */}
                </div>
                <br></br>
                <ul className="edmtrain-list">
                    {edmtrainEvents.success === true ?
                        apiEvents.filter(event => event.name)?.map((event) => (
                            <li key={event.id} className="edmtrain-event">
                                <a className="event-id-and-name" target="_blank" href={`${event.link}`}>
                                    <img className="preview-image-events-edmtrain" src="https://edmtrain.s3.amazonaws.com/img/logo/logo-web.svg" alt="edmtrain"></img>
                                    <br></br>
                                    {event.name}
                                    <div className="date" style={{ fontWeight: "bold" }}>{(addOneDay(event.date))}</div>
                                    <div className="location">{event.venue.name} &middot; {event.venue.location}</div>
                                </a>
                                <br></br>
                                <br />
                            </li>
                        ))
                        : null
                    }
                </ul>

            </ul>
        </div>
    );
};

export default EventsPage
