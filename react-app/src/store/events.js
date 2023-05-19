// Events actions and reducer
// Declare POJO action creators
const GET_EVENTS = 'events/getEvents'
const CREATE_EVENT = 'events/createEvent'
const GET_ONE_EVENT = 'events/getOneEvent'
// Store - action creators | events
const getEventsAction = (events) => {
    return {
        type: GET_EVENTS,
        events
    }
}

const createEventAction = (event) => {
    return {
        type: CREATE_EVENT,
        event
    }
}


// Store - Thunks | events
// Thunk 1: Get all events
export const getEventsThunk = () => async (dispatch) => {
    const res = await fetch('/api/events')
    if (res.ok) {
        const events = await res.json()
        dispatch(getEventsAction(events))
    }
}

// Thunk 2: Create an event
export const createEventThunk = (detailsOfEvent) => async (dispatch) => {
    const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(detailsOfEvent)
    });

    if (res.ok) {
        const createdEvent = await res.json();
        return createdEvent;
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
        case CREATE_EVENT:
            newState = {...state}
            debugger
            newState[action.event.db_data.id] = action.event
            return newState
        default:
            return state
    }
}
