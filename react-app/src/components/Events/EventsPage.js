import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EventsPage.css'
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../store/events";
import { useHistory } from "react-router-dom";
import stateData from "./locations.json"
const EventsPage = () => {
    // Todo: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)
    useEffect(() => {
        dispatch(getEventsThunk())
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
    const statesNullCity = stateJsonData.filter((state) => state.city === null)
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
    const apiEvents = edmtrainEvents.data
    if (!events.length) return <>Loading.....</>
    return (
        <div className="events-page">
            <ul className="events-list">
                <header className="events-data-header">
                </header>
                <div classname="image-on-top">
                    <img src="https://cdn.evbstatic.com/s3-build/fe/build/images/248d7e11d9885236625a1b207adf62c6-4_tablet_1067x470.jpg"></img>
                </div>
                <h2>User created Events</h2>
                <ul className="user-events-list">
                    {
                        events?.filter(event => event.event_name)?.map((event, index) => (
                            <li key={index} className="user-event">
                                <Link className="link-to-event" to={`events/${event.id}`}>
                                    <img className="preview-image-events" src={event.event_preview_image} alt="https://djmag.com/sites/default/files/styles/djm_23_961x540_jpg/public/article/image/EDC%20Vegas%20-%20DJ%20MAG.png.jpg"></img>
                                    <div className="event-info">
                                        <div className="event-id-and-name">{event.event_name}</div>
                                        <div className="date" style={{ fontWeight: "bold" }}>{new Date(event.event_start_date).toLocaleDateString()}</div>
                                        <div className="location">{event.event_city}, {event.event_state}</div>
                                        <div className="owner">Organizer: {event.owner.username}</div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <h2>EDMTRAIN Events</h2>
                <h3 className="location-changer">Located: {state}</h3>
                <select value={state} onChange={handleStateChange}>
                    {reducedStates.map((state) => (
                        <option key={state.id} value={state.state}>
                            {state.state}
                        </option>
                    ))}
                </select>
                <ul className="edmtrain-list">
                    {edmtrainEvents.success === true ?
                        apiEvents.filter(event => event.name)?.map((event, index) => (
                            <li key={index} className="edmtrain-event">
                                <a className="event-id-and-name" target="_blank" href={`${event.link}`}>
                                    <img className="preview-image-events-edmtrain" src="https://edmtrain.s3.amazonaws.com/img/logo/logo-web.svg"></img>
                                    <br></br>
                                    {event.name}
                                    <div className="date" style={{ fontWeight: "bold" }}>{new Date(event.date).toLocaleDateString()}</div>
                                    <div className="location">{event.venue.location}</div>
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
