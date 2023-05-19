
const GET_EVENTS = 'events/getEvents'

const getEventsAction = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

export const getEventsThunk = () => async (dispatch) => {
    const res = await fetch('/api/events')
    if (res.ok) {
        const events = await res.json()
        dispatch(getEventsAction(events))
    }
}

export default function eventsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_EVENTS:
            newState = {...state}
            action.events.db_data.forEach((db_event) => newState[db_event.id] = db_event)
            // action.events.edmtrain_events.forEach((event) => newState[event.id] = event)
            return newState
        default:
            return state
    }
}
