// Events actions and reducer
// Declare POJO action type
const GET_EVENTS = 'events/getEvents'
const CREATE_EVENT = 'events/createEvent'
const GET_ONE_EVENT = 'events/getOneEvent'
const EDIT_ONE_EVENT = 'events/editEvent'
const DELETE_ONE_EVENT = 'events/deleteEvent'
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

const editOneEventAction = (event) => {
    console.log("HIT THE editOneEventAction ==========>")
    return {
        type: EDIT_ONE_EVENT,
        event
    }
}

const deleteEventAction = (event) => {
    console.log("HIT THE deleteEventAction ==========>")
    return {
        type: DELETE_ONE_EVENT,
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
        const data = await res.json()

        await dispatch(getOneEventAction(data))
        return data
    }
}

// Thunk 4: Edit one event
export const editOneEventThunk = (event, eventId) => async (dispatch) => {
    console.log("HIT THE editOneEventThunk ==========>")
    console.log("eventId", eventId)
    console.log("event", event)
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
    })
    if (res.ok) {
    console.log("HIT THE editOneEventThunk | RESPONSE IS OK==========>")
        const editedEvent = await res.json()
        dispatch(editOneEventAction(editedEvent))
        return res
    }
}

// Thunk 5: Delete one event
export const deleteEventThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE deleteEventThunk ==========>")
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteEventAction(eventId))
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
        case EDIT_ONE_EVENT:
            console.log("HIT THE REDUCER EDIT_ONE_EVENT ==========>")
            newState = {...state}
            newState[action.event.event.id] = action.event
            return newState
        case DELETE_ONE_EVENT:
            console.log("HIT THE REDUCER DELETE_ONE_EVENT ==========>")
            newState = {...state}
            delete newState[action.event]
            return newState
        default:
            return state
    }
}
