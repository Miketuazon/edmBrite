// Tickets
// Declare POJO action type
const GET_TICKETS = 'tickets/getTickets'

// Action creators | tickets
const getTicketsAction = (tickets) => {
    return {
        type: GET_TICKETS,
        tickets
    }
}

// Thunks | tickets
// Thunk 1: Get all tickets
export const getTicketsThunk = (eventId) => async (dispatch) => {
    console.log("HIT THE getTicketsThunk ==========>")
    console.log(eventId)
    const res = await fetch(`/api/events/${eventId}/tickets`)
    // console.log("res of getTicketsThunk => ", res.json())

    if (res.ok) {
        const tickets = await res.json()
        dispatch(getTicketsAction(tickets))
    }
}

// reducer
export default function ticketsReducer(state = {}, action) {
    let newState;
    switch (action.type) {
        case GET_TICKETS:
            console.log("HIT THE ticketsReducer GET_TICKETS ==========>")
            newState = {...state}
            newState.ticketsOfEvent = {...action.tickets}
            return newState
        default:
            return state
    }
}
