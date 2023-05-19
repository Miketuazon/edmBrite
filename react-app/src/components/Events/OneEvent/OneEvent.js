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
    const eventDetails = useSelector((state) => state.events)
    console.log("eventDetails => ", eventDetails)
    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
    }, [dispatch, eventId])
    return (
        <div className="event-details">
            Hi!
            <div className="left-side">
                <div className="image-on-center-top">Image</div>
                <div className="title-to-location-container">
                    <div className="month-date"></div>
                    <div className="title"></div>
                    <div className="summary"></div>
                </div>
                <div className="when-and-where-container">
                    <div className="date-and-time"></div>
                    <div className="location"></div>
                </div>
                <div className="about-container">
                    <div className="about-this-event">
                        <div className="time"></div>
                        <div className="type-ticket"></div>
                    </div>
                    <div className="venue-photo"></div>
                    <div className="description">
                        <div className="artist-venue"></div>
                        <div className="day-month-dd-yyyy"></div>
                        <div className="description"></div>
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
