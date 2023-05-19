// Events actions and reducer
// Declare POJO action type
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

const getOneEventAction = (event) => {
    console.log("HIT THE getOneEventAction ==========>")
    return {
        type: GET_ONE_EVENT,
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

// Thunk 3: Get one event
export const getOneEventThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE getOneEventThunk ==========>")
    const res = await fetch(`/api/events/${eventId}`)
    if (res.ok) {
        debugger
        const data = await res.json()

        await dispatch(getOneEventAction(data))
        return data
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
            newState[action.event.db_data.id] = action.event
            return newState
        case GET_ONE_EVENT:
            console.log("HIT THE REDUCER GET_ONE_EVENT ==========>")
            newState = {...state}
            newState.singleEvent = {...action.event}
            return newState
        default:
            return state
    }
}
