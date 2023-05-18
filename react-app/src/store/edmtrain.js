
const GET_EDMTRAIN_EVENTS = 'events/getEDMTRAINEvents'

const getEDMTRAINEvents = (events) => {
    return {
        type: GET_EDMTRAIN_EVENTS,
        events
    }
}

export const getAllEDMTRAINEvents = () => async (dispatch) => {
    const res = await fetch('/api/events')
    if (res.ok) {
        const events = await res.json()
        dispatch(getEDMTRAINEvents(events))
    }
}

export default function edmtrainReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_EDMTRAIN_EVENTS:
            newState = {...state}
            action.events.db_data.forEach((db_event) => newState[db_event.id] = db_event)
            action.events.edmtrain_events.forEach((event) => newState[event.id] = event)
            return newState
        default:
            return state
    }
}
