import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateEvent.css'
// import { Link } from "react-router-dom"
import { createEventThunk } from "../../../store/events";
import { useHistory } from "react-router-dom";
import { getGenresThunk } from "../../../store/genres";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
const CreateEvent = () => {
    // Reminder: Need to learn AWS to serve images
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)
    const genresObj = useSelector(state => state.genres)
    const genres = Object.values(genresObj)
    useEffect(() => {
        dispatch(getGenresThunk())
    }, [dispatch])

    const [event_name, setEvent_name] = useState("")
    const [event_dj, setEvent_dj] = useState("")
    const [event_summary, setEvent_summary] = useState("")
    const [event_preview_image, setEvent_preview_image] = useState("")
    const [event_description_image, setEvent_description_image] = useState("")
    const [event_description, setEvent_description] = useState("")
    const [event_start_date, setEvent_start_date] = useState(new Date())
    const [event_end_date, setEvent_end_date] = useState(new Date())
    const [event_venue, setEvent_venue] = useState("")
    const [event_street_address, setEvent_street_address] = useState("")
    const [event_city, setEvent_city] = useState("")
    const [event_state, setEvent_state] = useState("")
    const [event_zip_code, setEvent_zip_code] = useState("")
    const [event_genre_id, setEvent_genre_id] = useState(1)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const updateEvent_name = (e) => setEvent_name(e.target.value)
    const updateEvent_dj = (e) => setEvent_dj(e.target.value)
    const updateEvent_summary = (e) => setEvent_summary(e.target.value)
    const updateEvent_preview_image = (e) => setEvent_preview_image(e.target.value)
    const updateEvent_description_image = (e) => setEvent_description_image(e.target.value)
    const updateEvent_description = (e) => setEvent_description(e.target.value)
    const updateEvent_start_date = (date) => setEvent_start_date(date)
    const updateEvent_end_date = (date) => setEvent_end_date(date)
    const updateEvent_genre_id = (e) => setEvent_genre_id(e.target.value)
    const updateEvent_venue = (e) => setEvent_venue(e.target.value)
    const updateEvent_street_address = (e) => setEvent_street_address(e.target.value)
    const updateEvent_city = (e) => setEvent_city(e.target.value)
    const updateEvent_state = (e) => setEvent_state(e.target.value)
    const updateEvent_zip_code = (e) => setEvent_zip_code(e.target.value)

    useEffect(() => {
        let e = {}
        setErrors(e)

        if (event_name.length < 3 || event_name.length > 50) e.event_name = ('Event name needs at least 3 characters and max of 50')
        if (event_summary.length < 3 || event_summary.length > 140) e.event_summary = ('Event summary needs at least 3 characters and max of 140')
        if (event_description.length < 3) e.event_description = ('Event description needs to be at least 3 characters.')
        if (!event_preview_image.length) e.event_preview_image = ('Event preview image is required')
        if (!event_description_image.length) e.event_description_image = ('Event description image is required')
        if (!event_genre_id) e.event_genre_id = ('Event Genre is required')
        if (!event_venue.length) e.event_venue = ('Event Venue is required')
        if (!event_street_address.length) e.event_street_address = ('Event Street Address is required')
        if (!event_city.length) e.event_city = ('City is required')
        if (!event_state.length) e.event_state = ('State is required')
        if (event_zip_code.length !== 5) e.event_zip_code = ('Zipcode is required and needs 5 numbers')

        let start = new Date(event_start_date)
        let end = new Date(event_end_date)
        let today = new Date()
        if (start > end) e.event_end_date = ('Event end date is before start date')
        if (today > end) e.event_end_date = ('Event end date is before today.')
        if (today > start) e.event_start_date = ('Event start date is before today.')

    }, [event_name, event_dj, event_preview_image, event_description_image, event_summary, event_description, event_start_date, event_end_date, event_genre_id, event_venue, event_street_address, event_city, event_state, event_zip_code,])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.keys(errors).length !== 0) {
            return
        }
        // const validationErrors = [];

        // if (event_name.length < 3 || event_name.length > 50) validationErrors.push('Event name needs at least 3 characters and max of 50')
        // if (event_summary.length < 3 || event_summary.length > 140) validationErrors.push('Event summary needs at least 3 characters and max of 140')
        // if (event_description.length < 3) validationErrors.push('Event description needs to be at least 3 characters.')
        // if (!event_start_date.length) validationErrors.push('Event start date is required')
        // if (!event_end_date.length) validationErrors.push('Event end date is required')
        // if (!event_genre_id) validationErrors.push('Event Genre is required')
        // if (!event_venue.length) validationErrors.push('Event Venue is required')
        // if (!event_street_address.length) validationErrors.push('Event Street Address is required')
        // if (!event_city.length) validationErrors.push('City is required')
        // if (!event_state.length) validationErrors.push('State is required')
        // if (event_zip_code.length !== 5) validationErrors.push('Zipcode is required and needs 5 numbers')
        // if (validationErrors.length) return setErrors(validationErrors)

        const createdEventDetails = {
            event_name, event_dj, event_summary, event_preview_image,
            event_description_image, event_description, event_start_date,
            event_end_date, event_venue, event_street_address, event_city,
            event_state, event_zip_code, event_genre_id
        }
        dispatch(createEventThunk(createdEventDetails))
        history.push(`/events`)
    }
    console.log("errors => ", errors)
    // if (!events.length) return <>Loading.....</>
    return (
        <div className="create-event-page">
            <h1>Create an event!</h1>
            <div className="create-form-div">
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="Basic-info">
                        <ul className="errors">
                            {hasSubmitted &&
                                Object.values(errors).map((error, idx) => (
                                    <li key={idx} style={{ color: "red", background: "yellow" }}>
                                        ERROR!: {error}
                                    </li>
                                ))}
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
                        <div className="header">Input an amazing image to use as your preview!</div>
                        <label>
                            Event Preview Image
                            <input
                                type='text' placeholder='.jpeg, .jpg, .png., .img' min='1'
                                required value={event_preview_image} onChange={updateEvent_preview_image}
                            />
                        </label>
                        <div className="organizer">Organizer: {currentUser?.username}</div>
                        <label>
                            DJ
                            <div className="dj">Let the people know who the main DJ is!</div>
                            <input
                                type='text' placeholder='Input who is playing for your show!' min='1'
                                required value={event_dj} onChange={updateEvent_dj}
                            />
                        </label>
                    </div>
                    <div className="location-date-time">
                        <h2>Location</h2>
                        <div className="venue">Help people in the area discover your event and let attendees know where to show up.</div>
                        <label>
                            Venue
                            <input
                                type='text' placeholder='e.g. Madison Square Garden' min='1'
                                required value={event_venue} onChange={updateEvent_venue}
                            />
                        </label>
                        <label>
                            Address
                            <input
                                type='text' placeholder='e.g. 155 5th' min='1'
                                required value={event_street_address} onChange={updateEvent_street_address}
                            />
                        </label>
                        <label>
                            City
                            <input
                                type='text' placeholder='e.g. San Francisco' min='1'
                                required value={event_city} onChange={updateEvent_city}
                            />
                        </label>
                        <label>
                            State
                            <input
                                type='text' placeholder='e.g. California' min='1'
                                required value={event_state} onChange={updateEvent_state}
                            />
                        </label>
                        <label>
                            Zip Code
                            <input
                                type='number' placeholder='e.g. 07666' pattern="[0-9]*"
                                required value={event_zip_code} onChange={updateEvent_zip_code}
                            />
                        </label>
                        <div className="date-time">
                            <h2>Date and Time</h2>
                            <h3>Please date/time like this format: 10/24/2023 08:00PM</h3>
                            <label>
                                Event Start Date
                                {/* <input
                                    type='text' placeholder='mm/dd/yyyy hh:mm AM/PM' min='1'
                                    required value={event_start_date} onChange={updateEvent_start_date}
                                /> */}
                                <DateTimePicker value={event_start_date} onChange={updateEvent_start_date}/>
                            </label>
                            <label>
                                Event End Date
                                {/* <input
                                    type='text' placeholder='mm/dd/yyyy hh:mm AM/PM' min='1'
                                    required value={event_end_date} onChange={updateEvent_end_date}
                                /> */}
                                <DateTimePicker value={event_end_date} onChange={updateEvent_end_date}/>
                            </label>
                            <div className="event-details">
                                <h2>Event details</h2>
                                <div className="header">Input an amazing image to go along with your description!</div>
                                <label>
                                    Event Preview Image
                                    <input
                                        type='text' placeholder='.jpg, .png., .img' min='1'
                                        required value={event_description_image} onChange={updateEvent_description_image}
                                    />
                                </label>
                                <label>
                                    {hasSubmitted && errors.event_summary && (
                                        <div className='error'>
                                            * {errors.event_summary}
                                        </div>
                                    )}
                                    Summary
                                    <input
                                        type='text' placeholder='Write a short event summary to get attendees excited.' min='1'
                                        required value={event_summary} onChange={updateEvent_summary}
                                    />
                                </label>
                                <label>
                                    {hasSubmitted && errors.event_description && (
                                        <div className='error'>
                                            * {errors.event_description}
                                        </div>
                                    )}
                                    Description
                                    <div>Add more details to your event like your schedule, sponsors, or featured guests.</div>
                                    <input
                                        type='textarea' placeholder='' min='1'
                                        required value={event_description} onChange={updateEvent_description}
                                    />
                                </label>
                                <label>
                                    {hasSubmitted && errors.event_genre_id && (
                                        <div className='error'>
                                            * {errors.event_genre_id}
                                        </div>
                                    )}
                                    Genre
                                    <div>Select a genre! If you can't decide, choose the default Electronic!</div>
                                    <select value={event_genre_id} onChange={updateEvent_genre_id}>
                                        {/* need to figure out way to iterate through genres */}
                                        {
                                            genres.map(genre => (
                                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                            ))
                                        }
                                    </select>
                                </label>
                                <div>
                                    <button className='btn' type="submit">Create event!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateEvent
