import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getEventsThunk } from '../../store/events'
import { NavLink, useLocation } from "react-router-dom"
import './ResultsPage.css'
import ResultsErrorMessage from './ResultsError'
import ResultsItem from './ResultsItem'
import { getUserLikesThunk } from '../../store/likes'

function ResultsPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    const currentUser = useSelector(state => state?.session?.user)
    const eventsObj = useSelector((state) => state.events)
    const events = Object.values(eventsObj)

    // Creating state and function for sorting posts
    const [sortOrder, setSortOrder] = useState('desc');
    function compareEvents(event1, event2) {
        const timestamp1 = new Date(event1.createdAt).getTime();
        const timestamp2 = new Date(event2.createdAt).getTime();
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
    // Filter posts if it matches query
    const filteredEvents = sortedEvents?.filter(event =>
        (event?.event_summary?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_name?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_venue?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.event_description?.toLowerCase())?.includes(query.toLowerCase()) ||
        (event?.owner?.username?.toLowerCase()?.includes(query.toLowerCase()))
        )

        useEffect(() => {
            dispatch(getEventsThunk())
            dispatch(getUserLikesThunk())
        }, [dispatch, JSON.stringify(filteredEvents)])
    // If query is empty or filteredPosts is empty
    if (!query || query.length === 0 || (filteredEvents && filteredEvents.length === 0) ) return <ResultsErrorMessage />

    return (
        <div className='results-of-search'>
            <div className='sort-container'>
                <div className='sort-and-results'>
                    <h2 className='res'>Results: {filteredEvents.length} | Query: {query}</h2>
                    <h2 className='sortt'>Sort by: &nbsp;
                        <button onClick={handleSortClick} className='sort-button'>
                            {sortOrder === 'asc' ? <i className='fas fa-angle-down'> Older</i> : <i className='fas fa-angle-up'> Newer</i>}
                        </button>
                    </h2>
                </div>
            </div>
            <ul className='posts'>
                {
                    filteredEvents.map(event => (
                        <li key={event?.id} className="event">
                            <ResultsItem event={event} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ResultsPage
