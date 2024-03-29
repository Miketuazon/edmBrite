import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events'
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'
import ResultsErrorMessage from './ResultsError'
import ResultsItem from './ResultsItem'
import { getUserLikesThunk } from '../../store/likes'
import Loader from '../Loader/Loader'

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)

    // Creating state and function for sorting posts
    const [sortOrder, setSortOrder] = useState('asc');
    function compareEvents(event1, event2) {
        const timestamp1 = new Date(event1.event_start_date).getTime();
        const timestamp2 = new Date(event2.event_start_date).getTime();
        if (sortOrder === 'asc') {
            return timestamp1 - timestamp2;
        } else {
            return timestamp2 - timestamp1;
        }
    }
    // Sort posts into asc or desc
    const sortedEvents = Object.values(events).sort(compareEvents);
    function handleSortClick() {
        if (sortOrder === 'asc') {
            setSortOrder('desc');
        } else {
            setSortOrder('asc');
        }
    }

    // variable to hold today's date as a string to compare if event is past or not
    const todayDateStr = new Date().toISOString()

    // Filter posts if it matches query
    const filteredEvents = sortedEvents?.filter(event =>
        (event?.event_summary?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_name?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_venue?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_description?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.owner?.username?.toLowerCase()?.includes(query.toLowerCase())) ||
        (event?.event_city.toLowerCase()?.includes(query.toLowerCase())) ||
        (event?.event_state.toLowerCase()?.includes(query.toLowerCase()))
        ).filter(event => event.event_end_date > todayDateStr)

        useEffect(() => {
            dispatch(getEventsThunk())
            dispatch(getUserLikesThunk())
        }, [dispatch, JSON.stringify(filteredEvents)])

    // Loading for events
    if (!filteredEvents.length === 0) return < Loader/>
    // If query is empty or filteredEvents is empty return no results message
    if (!query || query.length === 0 || (filteredEvents && filteredEvents.length === 0) ) return <ResultsErrorMessage />

    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <div className='sort-and-results'>
                    <h2 className='res'>Results: {filteredEvents.length} | Query: {query}</h2>
                    <h2 className='sortt'>Sort by: &nbsp;
                        <button onClick={handleSortClick} className='sort-button'>
                            {sortOrder === 'asc' ? <i className='fas fa-angle-down'> Newer</i> : <i className='fas fa-angle-up'> Older</i>}
                        </button>
                    </h2>
                </div>
            </div>
            <ul className='events-list-search'>
                {
                    filteredEvents.map(event => (
                        <div key={event?.id} className="event">
                            <ResultsItem event={event} />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default ResultsPage
