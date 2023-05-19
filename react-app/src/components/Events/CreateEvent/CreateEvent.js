import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateEvent.css'
// import { Link } from "react-router-dom"
import { createEventThunk } from "../../../store/events";
import { useHistory } from "react-router-dom";

const CreateEvent = () => {
    // Reminder: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)

    const [event_name, setEvent_name] = useState("")
    const [event_summary, setEvent_summary] = useState("")
    const [event_description, setEvent_description] = useState("")
    const [event_start_date, setEvent_start_date] = useState("")
    const [event_end_date, setEvent_end_date] = useState("")
    const [event_location, setEvent_location] = useState("")
    const [event_genre_id, setEvent_genre_id] = useState("")

    const [errors, setErrors] = useState([]);

    const updateEvent_name = (e) => setEvent_name(e.target.value)
    const updateEvent_summary = (e) => setEvent_summary(e.target.value)
    const updateEvent_description = (e) => setEvent_description(e.target.value)
    const updateEvent_start_date = (e) => setEvent_start_date(e.target.value)
    const updateEvent_end_date = (e) => setEvent_end_date(e.target.value)
    const updateEvent_location = (e) => setEvent_location(e.target.value)
    const updateEvent_genre_id = (e) => setEvent_genre_id(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = [];

        if (!event_name.length) validationErrors.push('Event name is required')
        if (!event_summary.length) validationErrors.push('Event summary is required')
        if (!event_description.length) validationErrors.push('Event description is required')
        if (!event_start_date.length) validationErrors.push('Event start date is required')
        if (!event_end_date.length) validationErrors.push('Event end date is required')
        if (!event_location.length) validationErrors.push('event_location is required')
        if (!event_genre_id) validationErrors.push('Event Genre is required')


        if (validationErrors.length) return setErrors(validationErrors)

        const createdEventDetails = {
            event_name, event_summary, event_description, event_start_date,
            event_end_date, event_location, event_genre_id
        }
        const newEvent = await dispatch(createEventThunk)
        history.push(`/events`)
    }

    // if (!events.length) return <>Loading.....</>
    return (
        <div className="create-event-page">
            <h1>Create an event!</h1>
            <div className="create-form-div">
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="Basic-info">
                        <ul>
                            {/* will place errors next to labels later */}
                            {errors?.map((error, idx) => (<li key={idx}>{error}</li>))}
                        </ul>
                        <h2>Basic Info</h2>
                        <div className="header">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</div>
                        <label>
                            Event Title
                            <input
                                type='text' placeholder='Be clear and descriptive' min='1'
                                required value={event_name} onChange={updateEvent_name}
                            />
                        </label>
                        <div className="organizer">Organizer: {currentUser?.username}</div>
                    </div>
                    <div className="location-date-time">
                        <h2>Location</h2>
                    <div className="header">Help people in the area discover your event and let attendees know where to show up.</div>
                        <label>
                            Event Title
                            <input
                                type='text' placeholder='Be clear and descriptive' min='1'
                                required value={event_name} onChange={updateEvent_name}
                            />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent
