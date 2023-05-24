import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UserLikesPage.css'
import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
import { useHistory } from "react-router-dom";

const UserLikesPage = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const eventsObj = useSelector(state => state.events)
    const events = Object.values(eventsObj)

    useEffect(() => {
        dispatch(getEventsThunk())
    }, [dispatch])

    if (!currentUser) return <h1>Unauthorized. You are not logged in</h1>
    if (!events) return <h1>Loading...</h1>
    return (
        <h1>We are in likes</h1>
    )
}

export default UserLikesPage
