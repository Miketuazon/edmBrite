import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './OneEvent.css'
import { useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";
import { getOneEventThunk } from "../../../store/events";

const OneEvent = () => {
    console.log("INSIDE ONEEVENT COMPONENT")
    const history = useHistory()
    const dispatch = useDispatch()
    const {eventId} = useParams();
    const event = useSelector((state) => state.events.singleEvent?.event)
    console.log("eventDetails => ", event)
    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch, eventId])


    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    if (event === undefined) return <>Loading...</>

    // Getting hours, mins, day and time of start
    const startDate = new Date(event.event_start_date)
    const endDate = new Date(event.event_end_date)
    let timeOfEvent = Math.abs(endDate - startDate) / 36e5
    let startMinutes = startDate.getMinutes()
    let startHours = startDate.getHours()
    // AM or PM
    let startSession = " AM"
    if (startHours === 0) startHours = 12
    if (startHours > 12) {
        startHours = startHours - 12
        startSession = " PM"
    }
    // Adding 0 if minutes < 10
    if (startMinutes < 10) startMinutes = '0' + startMinutes

    // get actual month, day, dayOfWeek, and year
    const startMonth = months[startDate.getMonth()]
    const startDay = startDate.getDate()
    const startDayOfWeek = days[startDate.getDay()]
    const startYear = startDate.getFullYear()

    // Getting hours, mins, day and time of end
    const endDateMonth = months[endDate.getMonth()]
    const endDay = days[endDate.getDate()]
    const endDayOfWeek = endDate.getDay()
    const endYear = endDate.getFullYear()
    let endMinutes = endDate.getMinutes()
    let endHours = endDate.getHours()
    // AM or PM
    let endSession = " AM"
    if (endHours === 0) startHours = 12
    if (endHours > 12) {
        endHours = endHours - 12
        endSession = " PM"
    }
    // Adding 0 if minutes < 10
    if (endMinutes < 10) endMinutes = '0' + endMinutes

    let tbaOrNot = timeOfEvent
    tbaOrNot === NaN ? tbaOrNot = 'TBA' : tbaOrNot = tbaOrNot + ' hours'
    return (
        <div className="event-details">
            Hi!
            <div className="left-side">
                <div className="image-on-center-top">Image</div>
                <div className="title-to-location-container">
                    <div className="month-day">{startMonth} {startDay}</div>
                    <h1 className="title">{event.event_name}</h1>
                    <div className="summary">{event.event_summary}</div>
                </div>
                <div className="when-and-where-container">
                    <h2>When and where</h2>
                    <div className="date-and-time">
                        <h3>Date and time</h3>
                        {startMonth} {startDay} &middot; {startHours}{startSession} - {endDateMonth} {endDay} &middot; {endHours}{endSession}
                        </div>
                    <div className="location">
                        <h3>Location</h3>
                        {event.event_venue}
                        </div>
                </div>
                <div className="about-container">
                    <div className="about-this-event">
                        <div className="time">{`${tbaOrNot}`} </div>
                        <div className="type-ticket"> Mobile eTicket</div>
                    </div>
                    <div className="venue-photo"></div>
                    <div className="description">
                        <div className="artist-venue">{event.event_name} at {event.event_venue}</div>
                        <div className="day-month-dd-yyyy">{startDayOfWeek} {startMonth} {startDay}, {startYear} </div>
                        <div className="start-hours-end-hours">{startHours}:{startMinutes} {startSession} - {endHours}:{endMinutes}{endSession}</div>
                        <div className="description">{event.event_description}</div>
                    </div>
                </div>
            </div>
            <div className="tickets-container">
                <div className="ticket-price"></div>
                <div className="get-tickets-button"></div>
            </div>

        </div>
    )
}

export default OneEvent
